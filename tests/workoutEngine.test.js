import { describe, it, expect } from 'vitest';
import { generateWorkout, exerciseMatchesEquipment } from '../js/workoutEngine.js';
import { EXERCISES } from '../js/exerciseData.js';

describe('Workout Engine - Equipment Filtering', () => {
  it('allows bodyweight exercise when Bodyweight equipment is selected', () => {
    const pushup = EXERCISES.find(ex => ex.id === 'pushup-classic');
    expect(exerciseMatchesEquipment(pushup, ['Bodyweight'])).toBe(true);
  });

  it('strictly excludes exercises requiring a bar/fixture when Pull-Up Bar is omitted', () => {
    const pullups = EXERCISES.find(ex => ex.id === 'pullups');
    const dips = EXERCISES.find(ex => ex.id === 'dips-chest-focus');

    // User only has Bodyweight (Home Zero Equipment)
    expect(exerciseMatchesEquipment(pullups, ['Bodyweight'])).toBe(false);
    expect(exerciseMatchesEquipment(dips, ['Bodyweight'])).toBe(false);

    // When Pull-Up Bar is selected, it passes
    expect(exerciseMatchesEquipment(pullups, ['Bodyweight', 'Pull-Up Bar'])).toBe(true);
  });

  it('rejects barbell exercises when Barbell is not in equipment list', () => {
    const benchPress = EXERCISES.find(ex => ex.id === 'barbell-bench-press');
    expect(exerciseMatchesEquipment(benchPress, ['Dumbbell', 'Bodyweight'])).toBe(false);
    expect(exerciseMatchesEquipment(benchPress, ['Barbell'])).toBe(true);
  });

  it('returns false for empty equipment selection', () => {
    const pushup = EXERCISES.find(ex => ex.id === 'pushup-classic');
    expect(exerciseMatchesEquipment(pushup, [])).toBe(false);
  });
});

describe('Workout Engine - Routine Generation', () => {
  it('generates a balanced Full-Body workout when no muscles are selected', () => {
    const routine = generateWorkout({
      durationMinutes: 45,
      selectedMuscles: [],
      selectedEquipment: ['Bodyweight', 'Dumbbell', 'Barbell', 'Cable', 'Machine'],
      difficulty: 'Intermediate',
      trainingMode: 'strength'
    });

    expect(routine).toBeDefined();
    expect(routine.splitType).toBe('FullBody');
    expect(routine.exercises.length).toBe(6); // 45 mins -> 6 exercises
    expect(routine.title).toContain('Full Body');
  });

  it('scales exercise count strictly based on session duration', () => {
    const r30 = generateWorkout({
      durationMinutes: 30,
      selectedMuscles: ['chest'],
      selectedEquipment: ['Bodyweight', 'Dumbbell'],
      difficulty: 'Beginner',
      trainingMode: 'strength'
    });
    expect(r30.exercises.length).toBe(4);

    const r45 = generateWorkout({
      durationMinutes: 45,
      selectedMuscles: ['chest'],
      selectedEquipment: ['Bodyweight', 'Dumbbell'],
      difficulty: 'Beginner',
      trainingMode: 'strength'
    });
    expect(r45.exercises.length).toBe(6);

    const r60 = generateWorkout({
      durationMinutes: 60,
      selectedMuscles: ['chest'],
      selectedEquipment: ['Bodyweight', 'Dumbbell'],
      difficulty: 'Beginner',
      trainingMode: 'strength'
    });
    expect(r60.exercises.length).toBe(8);
  });

  it('contains zero duplicate exercises within the same routine', () => {
    const routine = generateWorkout({
      durationMinutes: 60,
      selectedMuscles: ['chest', 'triceps', 'shoulders'],
      selectedEquipment: ['Bodyweight', 'Dumbbell', 'Barbell', 'Cable'],
      difficulty: 'Intermediate',
      trainingMode: 'strength'
    });

    const exerciseIds = routine.exercises.map(item => item.exercise.id);
    const uniqueIds = new Set(exerciseIds);
    expect(uniqueIds.size).toBe(exerciseIds.length);
  });

  it('prioritizes compound movements over isolation movements', () => {
    const routine = generateWorkout({
      durationMinutes: 45,
      selectedMuscles: ['chest', 'triceps'],
      selectedEquipment: ['Bodyweight', 'Dumbbell', 'Barbell'],
      difficulty: 'Intermediate',
      trainingMode: 'strength'
    });

    const firstExercise = routine.exercises[0].exercise;
    expect(firstExercise.mechanics).toBe('Compound');
  });

  it('strictly adheres to pure At-Home zero-equipment constraints', () => {
    const routine = generateWorkout({
      durationMinutes: 45,
      selectedMuscles: ['lats', 'upper_back'],
      selectedEquipment: ['Bodyweight'], // Pure Home mode
      difficulty: 'Beginner',
      trainingMode: 'strength'
    });

    routine.exercises.forEach(item => {
      expect(item.exercise.equipment).toBe('Bodyweight');
      expect(item.exercise.requiresBarOrFixture).toBeFalsy();
    });
  });

  it('configures timed minutes for bodyweight in endurance and cardio modes', () => {
    const enduranceRoutine = generateWorkout({
      durationMinutes: 30,
      selectedMuscles: ['chest'],
      selectedEquipment: ['Bodyweight'],
      difficulty: 'Beginner',
      trainingMode: 'endurance'
    });

    const bodyweightItem = enduranceRoutine.exercises.find(i => i.exercise.equipment === 'Bodyweight');
    expect(bodyweightItem).toBeDefined();
    expect(bodyweightItem.isTimed).toBe(true);
    expect(bodyweightItem.durationSeconds).toBe(60);
    expect(bodyweightItem.customReps).toContain('min');
  });

  it('prescribes target reps in strength mode', () => {
    const strengthRoutine = generateWorkout({
      durationMinutes: 30,
      selectedMuscles: ['chest'],
      selectedEquipment: ['Barbell', 'Dumbbell'],
      difficulty: 'Intermediate',
      trainingMode: 'strength'
    });

    strengthRoutine.exercises.forEach(item => {
      expect(item.isTimed).toBe(false);
      expect(item.customReps).toMatch(/reps/i);
      expect(item.customRestSeconds).toBeGreaterThanOrEqual(75);
    });
  });

  it('configures hybrid mode with strength in first half and endurance in second half', () => {
    const hybridRoutine = generateWorkout({
      durationMinutes: 45, // 6 exercises
      selectedMuscles: ['quadriceps', 'glutes', 'abs'],
      selectedEquipment: ['Bodyweight'],
      difficulty: 'Beginner',
      trainingMode: 'both'
    });

    // First half strength
    expect(hybridRoutine.exercises[0].isTimed).toBe(false);
    // Second half endurance
    const lastIdx = hybridRoutine.exercises.length - 1;
    expect(hybridRoutine.exercises[lastIdx].isTimed).toBe(true);
  });
});
