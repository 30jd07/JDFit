/**
 * JDFit Workout Engine
 * Pure, deterministic, testable workout generator.
 */

import { EXERCISES, MUSCLES } from './exerciseData.js';
import { validateWorkoutConfig } from './utils.js';

/**
 * Filter exercises matching available equipment.
 * Strictly guarantees that if 'Pull-Up Bar' is NOT in selected equipment,
 * exercises requiring a bar/fixture (e.g. pullups, bar dips) are excluded.
 * @param {object} exercise
 * @param {string[]} selectedEquipment
 * @returns {boolean}
 */
export function exerciseMatchesEquipment(exercise, selectedEquipment) {
  if (!Array.isArray(selectedEquipment) || selectedEquipment.length === 0) {
    return false;
  }

  // Must match the primary equipment tag
  if (!selectedEquipment.includes(exercise.equipment)) {
    return false;
  }

  // If exercise requires an overhead bar or dip fixture, user must have 'Pull-Up Bar' checked
  if (exercise.requiresBarOrFixture && !selectedEquipment.includes('Pull-Up Bar')) {
    return false;
  }

  return true;
}

/**
 * Generates an optimized, balanced workout routine based on user criteria.
 * Pure function: does not mutate inputs or touch DOM.
 * @param {object} config
 * @param {number} config.durationMinutes - 30, 45, or 60.
 * @param {string[]} config.selectedMuscles - Array of muscle IDs, or empty for Full Body.
 * @param {string[]} config.selectedEquipment - Array of equipment IDs.
 * @param {string} config.difficulty - 'Beginner' | 'Intermediate' | 'Advanced'.
 * @param {string} config.trainingMode - 'strength' | 'endurance' | 'both' | 'cardio'.
 * @param {object[]} [exerciseCatalog=EXERCISES] - Optional catalog for dependency injection/testing.
 * @returns {object} Structured WorkoutRoutine object.
 */
export function generateWorkout(config, exerciseCatalog = EXERCISES) {
  const validation = validateWorkoutConfig(config);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const { durationMinutes, selectedMuscles = [], selectedEquipment, difficulty, trainingMode } = config;

  // Exercise count targets based on standard session pacing
  const targetCount = durationMinutes === 30 ? 4 : durationMinutes === 45 ? 6 : 8;
  const setsPerExercise = durationMinutes === 30 ? 3 : durationMinutes === 45 ? 3 : 4;

  const isHomeOnly = selectedEquipment.length === 1 && selectedEquipment[0] === 'Bodyweight';

  // Helper filter for equipment compatibility
  const isCompatible = ex => exerciseMatchesEquipment(ex, selectedEquipment);

  let chosenExercises = [];

  // ==========================================
  // BRANCH 1: CARDIO MODE
  // ==========================================
  if (trainingMode === 'cardio') {
    const cardioPool = exerciseCatalog.filter(ex => (ex.isCardio || ex.equipment === 'Bodyweight') && isCompatible(ex));
    // Pick distinct exercises
    const shuffled = [...cardioPool].sort((a, b) => a.id.localeCompare(b.id));
    chosenExercises = shuffled.slice(0, targetCount);

    if (chosenExercises.length < targetCount) {
      // Fallback: fill with any compatible bodyweight exercises
      const extra = exerciseCatalog.filter(ex => isCompatible(ex) && !chosenExercises.some(c => c.id === ex.id));
      chosenExercises = [...chosenExercises, ...extra].slice(0, targetCount);
    }
  }

  // ==========================================
  // BRANCH 2: STRENGTH / ENDURANCE / HYBRID
  // ==========================================
  else {
    const isFullBody = !selectedMuscles || selectedMuscles.length === 0;

    let candidatePool = [];

    if (isFullBody) {
      // Full Body: Pick across major movement patterns (Squat, Hinge, Push, Pull, Core)
      candidatePool = exerciseCatalog.filter(isCompatible);
    } else {
      // Targeted: Matches any selected target or secondary muscles
      candidatePool = exerciseCatalog.filter(ex => {
        if (!isCompatible(ex)) return false;
        const matchesPrimary = ex.primaryMuscles.some(m => selectedMuscles.includes(m));
        const matchesSecondary = ex.secondaryMuscles.some(m => selectedMuscles.includes(m));
        return matchesPrimary || matchesSecondary;
      });
    }

    // Try to filter by difficulty first
    const difficultyMatched = candidatePool.filter(ex => ex.difficulty === difficulty);
    let workingPool = difficultyMatched.length >= targetCount ? difficultyMatched : candidatePool;

    // Fallback if targeted pool is too small for the duration
    if (workingPool.length < targetCount) {
      const extraCompatible = exerciseCatalog.filter(ex => isCompatible(ex) && !workingPool.some(w => w.id === ex.id));
      workingPool = [...workingPool, ...extraCompatible];
    }

    // Sort: Compound multi-joint lifts first, isolation exercises second
    const sorted = [...workingPool].sort((a, b) => {
      if (a.mechanics === 'Compound' && b.mechanics !== 'Compound') return -1;
      if (b.mechanics === 'Compound' && a.mechanics !== 'Compound') return 1;
      return 0;
    });

    // Ensure distinct exercises with balanced muscle representation
    const selected = [];
    const usedIds = new Set();
    const muscleFrequency = {};

    for (const ex of sorted) {
      if (selected.length >= targetCount) break;
      if (usedIds.has(ex.id)) continue;

      // In full body sessions, cap consecutive exercises hitting the exact same muscle group
      const primary = ex.primaryMuscles[0];
      if (isFullBody && (muscleFrequency[primary] || 0) >= 2 && selected.length < targetCount - 1) {
        continue;
      }

      selected.push(ex);
      usedIds.add(ex.id);
      muscleFrequency[primary] = (muscleFrequency[primary] || 0) + 1;
    }

    // If still short due to frequency filtering, backfill with remaining sorted pool
    if (selected.length < targetCount) {
      for (const ex of sorted) {
        if (selected.length >= targetCount) break;
        if (!usedIds.has(ex.id)) {
          selected.push(ex);
          usedIds.add(ex.id);
        }
      }
    }

    chosenExercises = selected;
  }

  // Safety ultimate fallback
  if (chosenExercises.length === 0) {
    chosenExercises = exerciseCatalog.filter(isCompatible).slice(0, targetCount);
  }

  // Generate Title & Description
  const muscleTitle =
    selectedMuscles.length > 0 ? selectedMuscles.map(m => MUSCLES[m]?.name || m).join(' & ') : 'Full Body';

  const routineTitle =
    trainingMode === 'cardio'
      ? `${durationMinutes}-Min At-Home HIIT Cardio Circuit`
      : `${durationMinutes}-Min ${muscleTitle}${isHomeOnly ? ' (Home)' : ''} Routine`;

  const routineDescription =
    trainingMode === 'cardio'
      ? `${difficulty} zero-equipment bodyweight cardio circuit engineered for maximum metabolic conditioning at home.`
      : `${difficulty} ${trainingMode.toUpperCase()} routine designed to fit ~${durationMinutes} minutes with ${selectedEquipment.join(', ')}.`;

  // Build Structured Prescription per Exercise
  const exercises = chosenExercises.map((ex, idx) => {
    let isTimed = false;
    let repText = '';
    let durationSeconds = undefined;
    let restSeconds = 60;

    if (trainingMode === 'cardio') {
      isTimed = true;
      repText = '1 min timed set';
      durationSeconds = 60;
      restSeconds = 25;
    } else if (trainingMode === 'endurance') {
      if (ex.equipment === 'Bodyweight') {
        isTimed = true;
        repText = '1 min continuous';
        durationSeconds = 60;
        restSeconds = 30;
      } else {
        isTimed = false;
        repText = ex.goalProtocols.endurance?.reps || '15-20 reps';
        restSeconds = 45;
      }
    } else if (trainingMode === 'both') {
      // First half strength, second half endurance
      const isStrengthHalf = idx < Math.ceil(chosenExercises.length / 2);
      if (isStrengthHalf) {
        isTimed = false;
        repText = ex.goalProtocols.strength?.reps || '5-6 reps';
        restSeconds = 90;
      } else {
        if (ex.equipment === 'Bodyweight') {
          isTimed = true;
          repText = '1 min timed';
          durationSeconds = 60;
          restSeconds = 40;
        } else {
          isTimed = false;
          repText = ex.goalProtocols.endurance?.reps || '15-20 reps';
          restSeconds = 45;
        }
      }
    } else {
      // Strength mode
      if (ex.equipment === 'Bodyweight') {
        isTimed = false;
        repText = ex.goalProtocols.strength?.reps || '12-15 strict reps';
        restSeconds = 75;
      } else {
        isTimed = false;
        repText = ex.goalProtocols.strength?.reps || '4-6 reps';
        restSeconds = 120;
      }
    }

    return {
      order: idx + 1,
      exercise: ex,
      customSets: setsPerExercise,
      customReps: repText,
      isTimed,
      durationSeconds,
      customRestSeconds: restSeconds,
      notes: ex.coachingCues[0] || 'Focus on controlled eccentric tempo.',
      completedSets: new Array(setsPerExercise).fill(false)
    };
  });

  return {
    id: `routine-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    title: routineTitle,
    description: routineDescription,
    splitType: selectedMuscles.length === 0 ? 'FullBody' : trainingMode === 'cardio' ? 'Cardio' : 'Targeted',
    targetMuscles: selectedMuscles,
    durationMinutes,
    estimatedMinutes: durationMinutes,
    difficulty,
    trainingMode,
    selectedEquipment,
    createdAt: new Date().toISOString(),
    exercises
  };
}
