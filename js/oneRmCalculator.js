/**
 * JDFit One-Rep Max (1RM) Calculator Module
 * Implements validated strength formulas (Brzycki & Epley) with strict domain constraints.
 */

export const SAFETY_DISCLAIMER =
  '1RM estimates are mathematical approximations intended for healthy individuals with proper lifting technique. Actual maximal strength depends on biomechanics, neuromuscular fatigue, warm-up, and recovery. This tool does not constitute medical, rehabilitation, or physical therapy advice. Always use safety spotters or mechanical safety pins when attempting maximal loads.';

/**
 * Validates 1RM input parameters.
 * @param {number} weight - Positive numeric load lifted.
 * @param {number} reps - Integer between 1 and 12 repetitions completed.
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validate1RMInput(weight, reps) {
  if (typeof weight !== 'number' || isNaN(weight) || weight <= 0) {
    return {
      isValid: false,
      error: 'Weight lifted must be a positive number greater than 0.'
    };
  }

  if (typeof reps !== 'number' || isNaN(reps) || !Number.isInteger(reps) || reps < 1 || reps > 12) {
    return {
      isValid: false,
      error: 'Reps completed must be an integer between 1 and 12 for reliable estimation.'
    };
  }

  return { isValid: true };
}

/**
 * Calculates 1RM using the Brzycki formula:
 * 1RM = Weight * (36 / (37 - Reps))
 * @param {number} weight
 * @param {number} reps
 * @returns {number}
 */
export function calculateBrzycki(weight, reps) {
  if (reps === 1) return weight;
  return weight * (36 / (37 - reps));
}

/**
 * Calculates 1RM using the Epley formula:
 * 1RM = Weight * (1 + 0.0333 * Reps)
 * @param {number} weight
 * @param {number} reps
 * @returns {number}
 */
export function calculateEpley(weight, reps) {
  if (reps === 1) return weight;
  return weight * (1 + 0.0333 * reps);
}

/**
 * Calculates comprehensive 1RM estimates with consistent rounding and percentages.
 * @param {number} weight
 * @param {number} reps
 * @returns {{
 *   weight: number,
 *   reps: number,
 *   brzycki: number,
 *   epley: number,
 *   average: number,
 *   percentages: Array<{ percent: number, load: number, targetReps: string }>,
 *   formulaExplanation: string,
 *   disclaimer: string
 * }}
 */
export function calculateOneRepMax(weight, reps) {
  const validation = validate1RMInput(weight, reps);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const brzyckiRaw = calculateBrzycki(weight, reps);
  const epleyRaw = calculateEpley(weight, reps);

  const brzycki = Math.round(brzyckiRaw);
  const epley = Math.round(epleyRaw);
  const average = Math.round((brzyckiRaw + epleyRaw) / 2);

  // Common training percentages based on average estimated 1RM
  const percentageLadder = [
    { percent: 95, targetReps: '1-2 reps' },
    { percent: 90, targetReps: '3-4 reps' },
    { percent: 85, targetReps: '5-6 reps' },
    { percent: 80, targetReps: '7-8 reps' },
    { percent: 75, targetReps: '9-10 reps' },
    { percent: 70, targetReps: '11-12 reps' }
  ];

  const percentages = percentageLadder.map(item => ({
    percent: item.percent,
    load: Math.round(average * (item.percent / 100)),
    targetReps: item.targetReps
  }));

  const formulaExplanation =
    reps === 1
      ? 'A single repetition at maximal effort is an empirical 1RM.'
      : `Computed from ${reps} reps using the Brzycki (${brzycki} lbs) and Epley (${epley} lbs) formulas, averaged for high predictive accuracy.`;

  return {
    weight,
    reps,
    brzycki,
    epley,
    average,
    percentages,
    formulaExplanation,
    disclaimer: SAFETY_DISCLAIMER
  };
}
