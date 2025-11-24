import {
  ALCOHOL_DENSITY_G_PER_ML,
  DISTRIBUTION_RATIO_FEMALE,
  DISTRIBUTION_RATIO_MALE,
  ELIMINATION_RATE_DEFAULT,
  ELIMINATION_RATE_MAX,
  ELIMINATION_RATE_MIN,
  LEGAL_LIMITS,
  RISK_THRESHOLDS,
} from './constants';
import type {
  BacCalculationInput,
  BacEstimate,
  BacRiskClassification,
  Sex,
  TimeToZeroEstimate,
} from './types';
import { convertWeight } from './units';

function getDistributionRatio(sex: Sex) {
  return sex === 'male' ? DISTRIBUTION_RATIO_MALE : DISTRIBUTION_RATIO_FEMALE;
}

export function calculateAlcoholMassGrams(
  drinks: BacCalculationInput['drinks'],
): number {
  return drinks.reduce((sum, drink) => {
    if (drink.count <= 0 || drink.volumeMl <= 0 || drink.abvPercent <= 0) {
      return sum;
    }
    const volumeLiters = (drink.volumeMl * drink.count) / 1000;
    const pureAlcoholLiters = volumeLiters * (drink.abvPercent / 100);
    const grams = pureAlcoholLiters * ALCOHOL_DENSITY_G_PER_ML * 1000;
    return sum + grams;
  }, 0);
}

export function classifyRiskLevel(bacPercent: number): BacRiskClassification {
  if (bacPercent <= 0) {
    return { level: 'low', messageKey: 'risk.low' };
  }
  if (bacPercent <= RISK_THRESHOLDS.lowUpper) {
    return { level: 'low', messageKey: 'risk.low' };
  }
  if (bacPercent <= RISK_THRESHOLDS.mediumUpper) {
    return { level: 'medium', messageKey: 'risk.medium' };
  }
  return { level: 'high', messageKey: 'risk.high' };
}

export function estimateBac(input: BacCalculationInput): BacEstimate {
  const weightKg = convertWeight(input.weight, input.weightUnit, 'kg');
  const alcoholMassGrams = calculateAlcoholMassGrams(input.drinks);

  const distributionRatio = getDistributionRatio(input.sex);
  const bodyWaterInLiters = weightKg * distributionRatio;

  if (bodyWaterInLiters <= 0) {
    return {
      bacPercent: 0,
      countryCode: input.countryCode,
      legalLimit: null,
      overLegalLimit: null,
      risk: classifyRiskLevel(0),
    };
  }

  // Widmark-style estimate: convert fraction of alcohol in blood water to percentage.
  const rawBacFraction = alcoholMassGrams / (bodyWaterInLiters * 1000);
  const rawBacPercent = rawBacFraction * 100;
  const reducedBac =
    rawBacPercent -
    ELIMINATION_RATE_DEFAULT * Math.max(0, input.timeSinceFirstDrinkHours);
  const bacPercent = Number(Math.max(0, reducedBac).toFixed(3));

  const legal = LEGAL_LIMITS[input.countryCode]?.general ?? null;
  const overLegalLimit = legal == null ? null : bacPercent >= legal;
  const risk = classifyRiskLevel(bacPercent);

  return {
    bacPercent,
    countryCode: input.countryCode,
    legalLimit: legal,
    overLegalLimit,
    risk,
  };
}

export function estimateTimeToZero(
  currentBacPercent: number,
  legalLimitPercent: number | null,
): TimeToZeroEstimate {
  const safeBac = Math.max(0, currentBacPercent);
  if (safeBac === 0) {
    return {
      currentBacPercent: 0,
      toZeroHoursRange: [0, 0],
      toLegalLimitHoursRange: legalLimitPercent == null ? null : [0, 0],
    };
  }

  const minRate = ELIMINATION_RATE_MAX;
  const maxRate = ELIMINATION_RATE_MIN;

  const toZeroLow = safeBac / minRate;
  const toZeroHigh = safeBac / maxRate;

  let toLegalLimitHoursRange: [number, number] | null = null;
  if (legalLimitPercent != null && safeBac > legalLimitPercent) {
    const delta = safeBac - legalLimitPercent;
    const toLimitLow = delta / minRate;
    const toLimitHigh = delta / maxRate;
    toLegalLimitHoursRange = [
      Number(Math.max(0, toLimitLow).toFixed(1)),
      Number(Math.max(0, toLimitHigh).toFixed(1)),
    ];
  }

  return {
    currentBacPercent: safeBac,
    toZeroHoursRange: [
      Number(Math.max(0, toZeroLow).toFixed(1)),
      Number(Math.max(0, toZeroHigh).toFixed(1)),
    ],
    toLegalLimitHoursRange,
  };
}
