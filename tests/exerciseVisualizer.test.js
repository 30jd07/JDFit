import { describe, it, expect } from 'vitest';
import { getExerciseMovementPattern, MOVEMENT_PATTERNS } from '../js/exerciseVisualizer.js';
import { EXERCISES } from '../js/exerciseData.js';

describe('Exercise Biomechanical Visualizer & Movement Patterns', () => {
  it('correctly exports the 6 fundamental movement patterns with rich metadata', () => {
    expect(MOVEMENT_PATTERNS).toHaveProperty('push');
    expect(MOVEMENT_PATTERNS).toHaveProperty('pull');
    expect(MOVEMENT_PATTERNS).toHaveProperty('squat');
    expect(MOVEMENT_PATTERNS).toHaveProperty('hinge');
    expect(MOVEMENT_PATTERNS).toHaveProperty('core');
    expect(MOVEMENT_PATTERNS).toHaveProperty('cardio');

    expect(MOVEMENT_PATTERNS.push.jointActions).toContain('Shoulder');
    expect(MOVEMENT_PATTERNS.pull.jointActions).toContain('retraction');
    expect(MOVEMENT_PATTERNS.squat.jointActions).toContain('knee flexion');
    expect(MOVEMENT_PATTERNS.hinge.jointActions).toContain('Hip flexion');
    expect(MOVEMENT_PATTERNS.core.jointActions).toContain('lumbar stabilization');
  });

  it('categorizes classic push exercises into push movement pattern', () => {
    const bench = getExerciseMovementPattern('barbell-bench-press');
    expect(bench.pattern).toBe('push');
    expect(bench.subType).toBe('Horizontal Press');
    expect(bench.animKey).toBe('bench_press');

    const pushup = getExerciseMovementPattern('pushup-classic');
    expect(pushup.pattern).toBe('push');

    const ohp = getExerciseMovementPattern('overhead-barbell-press');
    expect(ohp.pattern).toBe('push');
    expect(ohp.subType).toBe('Vertical Overhead Press');
  });

  it('categorizes pull exercises into pull movement pattern', () => {
    const pullup = getExerciseMovementPattern('pullups');
    expect(pullup.pattern).toBe('pull');

    const latPull = getExerciseMovementPattern('lat-pulldown');
    expect(latPull.pattern).toBe('pull');

    const bicepCurl = getExerciseMovementPattern('barbell-bicep-curl');
    expect(bicepCurl.pattern).toBe('pull');
    expect(bicepCurl.subType).toBe('Elbow Flexion');
  });

  it('categorizes squat, hinge, core, and cardio patterns accurately', () => {
    const squat = getExerciseMovementPattern('barbell-back-squat');
    expect(squat.pattern).toBe('squat');

    const deadlift = getExerciseMovementPattern('barbell-deadlift');
    expect(deadlift.pattern).toBe('hinge');

    const rdl = getExerciseMovementPattern('romanian-deadlift');
    expect(rdl.pattern).toBe('hinge');

    const plank = getExerciseMovementPattern('plank-classic');
    expect(plank.pattern).toBe('core');

    const burpee = getExerciseMovementPattern('burpees');
    expect(burpee.pattern).toBe('cardio');
  });

  it('ensures every single exercise in EXERCISES maps to a valid movement pattern', () => {
    EXERCISES.forEach(ex => {
      const result = getExerciseMovementPattern(ex);
      expect(['push', 'pull', 'squat', 'hinge', 'core', 'cardio']).toContain(result.pattern);
      expect(result.label).toBeDefined();
      expect(result.tempoGuide).toBeDefined();
      expect(result.breathingGuide).toBeDefined();
      expect(result.animKey).toBeDefined();
    });
  });

  it('gracefully handles unknown or custom exercises using anatomical heuristics', () => {
    const unknownChest = getExerciseMovementPattern({
      id: 'custom-chest-press',
      name: 'Custom Smith Incline',
      primaryMuscles: ['chest']
    });
    expect(unknownChest.pattern).toBe('push');

    const unknownBack = getExerciseMovementPattern({
      id: 'cable-high-row',
      name: 'Cable High Row',
      primaryMuscles: ['lats']
    });
    expect(unknownBack.pattern).toBe('pull');

    const fallbackNull = getExerciseMovementPattern(null);
    expect(fallbackNull.pattern).toBe('push');
  });
});
