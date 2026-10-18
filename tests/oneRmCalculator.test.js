import { describe, it, expect } from 'vitest';
import {
  calculateBrzycki,
  calculateEpley,
  calculateOneRepMax,
  validate1RMInput,
  SAFETY_DISCLAIMER
} from '../js/oneRmCalculator.js';

describe('1RM Calculator - Input Validation', () => {
  it('accepts valid weight and reps', () => {
    expect(validate1RMInput(225, 5).isValid).toBe(true);
    expect(validate1RMInput(135.5, 1).isValid).toBe(true);
    expect(validate1RMInput(315, 12).isValid).toBe(true);
  });

  it('rejects non-positive weights', () => {
    expect(validate1RMInput(0, 5).isValid).toBe(false);
    expect(validate1RMInput(-50, 5).isValid).toBe(false);
    expect(validate1RMInput(NaN, 5).isValid).toBe(false);
    expect(validate1RMInput('100', 5).isValid).toBe(false);
  });

  it('rejects invalid reps (outside 1-12 range or non-integers)', () => {
    expect(validate1RMInput(200, 0).isValid).toBe(false);
    expect(validate1RMInput(200, 13).isValid).toBe(false);
    expect(validate1RMInput(200, 5.5).isValid).toBe(false);
    expect(validate1RMInput(200, -1).isValid).toBe(false);
  });
});

describe('1RM Calculator - Formulas', () => {
  it('returns exact weight when reps is 1', () => {
    expect(calculateBrzycki(250, 1)).toBe(250);
    expect(calculateEpley(250, 1)).toBe(250);

    const result = calculateOneRepMax(250, 1);
    expect(result.brzycki).toBe(250);
    expect(result.epley).toBe(250);
    expect(result.average).toBe(250);
  });

  it('calculates correct Brzycki value: 200 * (36 / (37 - 5)) = 225', () => {
    const raw = calculateBrzycki(200, 5);
    expect(raw).toBe(225);
  });

  it('calculates correct Epley value: 200 * (1 + 0.0333 * 5) = 233.3', () => {
    const raw = calculateEpley(200, 5);
    expect(Math.round(raw)).toBe(233);
  });

  it('returns full calculation structure with rounded numbers and percentage table', () => {
    const result = calculateOneRepMax(200, 5);

    expect(result.weight).toBe(200);
    expect(result.reps).toBe(5);
    expect(result.brzycki).toBe(225);
    expect(result.epley).toBe(233);
    expect(result.average).toBe(229); // (225 + 233.3) / 2 = 229.15 -> 229

    expect(result.percentages.length).toBe(6);
    expect(result.percentages[0].percent).toBe(95);
    expect(result.percentages[0].load).toBe(Math.round(229 * 0.95));

    expect(result.disclaimer).toBe(SAFETY_DISCLAIMER);
    expect(result.formulaExplanation).toContain('Brzycki');
    expect(result.formulaExplanation).toContain('Epley');
  });

  it('throws an error if calculateOneRepMax is called with invalid arguments', () => {
    expect(() => calculateOneRepMax(-100, 5)).toThrowError(/positive number/);
    expect(() => calculateOneRepMax(100, 20)).toThrowError(/between 1 and 12/);
  });
});
