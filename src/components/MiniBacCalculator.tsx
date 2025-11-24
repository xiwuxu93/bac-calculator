'use client';

import BacCalculator from '@/components/BacCalculator';
import type { CountryCode } from '@/lib/bac/types';

type MiniBacCalculatorProps = {
  defaultCountryCode?: CountryCode;
};

export default function MiniBacCalculator({
  defaultCountryCode = 'US',
}: MiniBacCalculatorProps) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3 shadow-sm md:p-4">
      <BacCalculator defaultCountryCode={defaultCountryCode} enableLocalStorage={false} />
    </div>
  );
}

