import type { CountryCode, LegalLimit } from './types';

export const ALCOHOL_DENSITY_G_PER_ML = 0.789;

export const DISTRIBUTION_RATIO_MALE = 0.68;
export const DISTRIBUTION_RATIO_FEMALE = 0.55;

export const ELIMINATION_RATE_MIN = 0.01;
export const ELIMINATION_RATE_MAX = 0.02;
export const ELIMINATION_RATE_DEFAULT = 0.015;

export const LEGAL_LIMITS: Record<CountryCode, LegalLimit> = {
  US: {
    general: 0.08,
    professional: 0.04,
    notes:
      'Many U.S. states use 0.08% as the per se limit for most drivers and lower limits for commercial and underage drivers.',
  },
  UK: {
    general: 0.08,
    notes:
      'England and Wales typically use 0.08%. Scotland and some other jurisdictions may use lower limits.',
  },
  AU: {
    general: 0.05,
    notes:
      'Many Australian states use 0.05% for most drivers, with stricter limits for learner, provisional, and professional drivers.',
  },
  CA: {
    general: 0.08,
    notes:
      'Canadian federal impaired driving offences often reference 0.08%, while provinces may apply additional administrative limits.',
  },
  NZ: {
    general: 0.05,
    notes:
      'New Zealand commonly uses 0.05% for adult drivers, with lower limits or zero tolerance for younger drivers.',
  },
  MA: {
    general: 0.02,
    notes:
      'Some sources describe Morocco as having very low or near-zero tolerated BAC limits. Always confirm with current local law.',
  },
  DZ: {
    general: 0.0,
    notes:
      'Some sources describe Algeria as effectively having a zero-tolerance policy for driving after drinking. Always confirm with current local law.',
  },
};

export const RISK_THRESHOLDS = {
  lowUpper: 0.029,
  mediumUpper: 0.079,
};

