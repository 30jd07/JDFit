import { describe, it, expect } from 'vitest';
import { validateWorkoutConfig, escapeHtml, formatSeconds } from '../js/utils.js';

describe('Validation & Utility Tests', () => {
  it('validates a correct workout configuration', () => {
    const valid = {
      durationMinutes: 45,
      trainingMode: 'strength',
      difficulty: 'Intermediate',
      selectedEquipment: ['Bodyweight', 'Dumbbell'],
      selectedMuscles: ['chest', 'triceps']
    };
    expect(validateWorkoutConfig(valid).isValid).toBe(true);
  });

  it('rejects invalid session durations', () => {
    const invalid = {
      durationMinutes: 20,
      trainingMode: 'strength',
      difficulty: 'Intermediate',
      selectedEquipment: ['Bodyweight']
    };
    const res = validateWorkoutConfig(invalid);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('session duration');
  });

  it('rejects invalid training modes', () => {
    const invalid = {
      durationMinutes: 45,
      trainingMode: 'powerlifting_invalid',
      difficulty: 'Intermediate',
      selectedEquipment: ['Bodyweight']
    };
    const res = validateWorkoutConfig(invalid);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('training mode');
  });

  it('rejects empty equipment list', () => {
    const invalid = {
      durationMinutes: 45,
      trainingMode: 'strength',
      difficulty: 'Intermediate',
      selectedEquipment: []
    };
    const res = validateWorkoutConfig(invalid);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('equipment');
  });

  it('rejects invalid muscle IDs', () => {
    const invalid = {
      durationMinutes: 45,
      trainingMode: 'strength',
      difficulty: 'Intermediate',
      selectedEquipment: ['Bodyweight'],
      selectedMuscles: ['biceps', 'non_existent_muscle_zone']
    };
    const res = validateWorkoutConfig(invalid);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('Unrecognized target muscle');
  });

  it('escapes dangerous HTML characters safely', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml('Jane & John')).toBe('Jane &amp; John');
  });

  it('formats seconds into MM:SS correctly', () => {
    expect(formatSeconds(0)).toBe('0:00');
    expect(formatSeconds(65)).toBe('1:05');
    expect(formatSeconds(3600)).toBe('60:00');
    expect(formatSeconds(-10)).toBe('0:00');
  });
});
