export type Sex = 'male' | 'female';

export type WeightUnit = 'kg' | 'lb';

export type BacUnit = 'percent' | 'permille' | 'mgPerDl';

export type DrinkType = 'beer' | 'wine' | 'spirits' | 'other';

export type CountryCode = 'US' | 'UK' | 'AU' | 'CA' | 'NZ' | 'MA' | 'DZ';

export type LegalLimitCategory = 'general' | 'novice' | 'professional';

export interface LegalLimit {
  general: number | null;
  novice?: number | null;
  professional?: number | null;
  notes?: string;
  sourceUrl?: string;
}

export interface DrinkInput {
  id: string;
  type: DrinkType;
  count: number;
  volumeMl: number;
  abvPercent: number;
}

export interface BacCalculationInput {
  sex: Sex;
  weight: number;
  weightUnit: WeightUnit;
  countryCode: CountryCode;
  timeSinceFirstDrinkHours: number;
  drinks: DrinkInput[];
}

export type BacRiskLevel = 'low' | 'medium' | 'high';

export interface BacRiskClassification {
  level: BacRiskLevel;
  messageKey: string;
}

export interface BacEstimate {
  bacPercent: number;
  countryCode: CountryCode;
  legalLimit: number | null;
  overLegalLimit: boolean | null;
  risk: BacRiskClassification;
}

export interface TimeToZeroEstimate {
  currentBacPercent: number;
  toZeroHoursRange: [number, number] | null;
  toLegalLimitHoursRange: [number, number] | null;
}

