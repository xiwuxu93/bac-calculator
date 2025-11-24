'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { estimateTimeToZero } from '@/lib/bac/calculation';
import { LEGAL_LIMITS } from '@/lib/bac/constants';
import type { BacUnit, CountryCode } from '@/lib/bac/types';
import { convertBac } from '@/lib/bac/units';

type BacTimeToZeroCalculatorProps = {
  defaultCountryCode?: CountryCode;
};

export default function BacTimeToZeroCalculator({
  defaultCountryCode = 'US',
}: BacTimeToZeroCalculatorProps) {
  const t = useTranslations('timeToZero');

  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [inputValue, setInputValue] = useState<string>('0.08');
  const [inputUnit, setInputUnit] = useState<BacUnit>('percent');
  const [error, setError] = useState<string | null>(null);

  const [resultText, setResultText] = useState<{
    summary: string;
    toZero?: string;
    toLimit?: string;
  } | null>(null);

  const legalLimit = LEGAL_LIMITS[countryCode]?.general ?? null;

  function handleEstimate() {
    const raw = parseFloat(inputValue.replace(',', '.'));
    if (!Number.isFinite(raw) || raw < 0) {
      setError(t('errors.valueInvalid'));
      setResultText(null);
      return;
    }
    setError(null);

    const currentPercent = convertBac(raw, inputUnit, 'percent');
    const timeEstimate = estimateTimeToZero(currentPercent, legalLimit);

    const summary =
      currentPercent <= 0
        ? t('results.summaryZero')
        : t('results.summary', { bac: currentPercent.toFixed(3) });

    const toZero =
      timeEstimate.toZeroHoursRange &&
      t('results.toZero', {
        from: timeEstimate.toZeroHoursRange[0].toFixed(1),
        to: timeEstimate.toZeroHoursRange[1].toFixed(1),
      });

    const toLimit =
      timeEstimate.toLegalLimitHoursRange &&
      t('results.toLegalLimit', {
        from: timeEstimate.toLegalLimitHoursRange[0].toFixed(1),
        to: timeEstimate.toLegalLimitHoursRange[1].toFixed(1),
      });

    setResultText({
      summary,
      toZero: toZero ?? undefined,
      toLimit: toLimit ?? undefined,
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm md:p-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">{t('form.title')}</h2>
          <p className="text-sm text-gray-600">{t('form.subtitle')}</p>
        </div>

        {error && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-[3fr,2fr]">
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="bac-value" className="block text-sm font-medium text-gray-700">
                {t('form.bacLabel')}
              </label>
              <div className="flex gap-2">
                <input
                  id="bac-value"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.001}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <select
                  value={inputUnit}
                  onChange={(event) => setInputUnit(event.target.value as BacUnit)}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="percent">{t('form.bacUnitPercent')}</option>
                  <option value="permille">{t('form.bacUnitPermille')}</option>
                  <option value="mgPerDl">{t('form.bacUnitMgPerDl')}</option>
                </select>
              </div>
              <p className="text-xs text-gray-500">{t('form.bacHelp')}</p>
            </div>

            <div className="space-y-1">
              <label htmlFor="time-country" className="block text-sm font-medium text-gray-700">
                {t('form.countryLabel')}
              </label>
              <select
                id="time-country"
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value as CountryCode)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="US">{t('countries.US')}</option>
                <option value="UK">{t('countries.UK')}</option>
                <option value="AU">{t('countries.AU')}</option>
                <option value="CA">{t('countries.CA')}</option>
                <option value="NZ">{t('countries.NZ')}</option>
                <option value="MA">{t('countries.MA')}</option>
                <option value="DZ">{t('countries.DZ')}</option>
              </select>
              <p className="text-xs text-gray-500">{t('form.countryHelp')}</p>
            </div>

            <button
              type="button"
              onClick={handleEstimate}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              {t('actions.estimate')}
            </button>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-gray-800 shadow-sm">
            {!resultText && <p className="text-sm text-gray-600">{t('results.placeholder')}</p>}
            {resultText && (
              <div className="space-y-2">
                <p>{resultText.summary}</p>
                {resultText.toZero && <p>{resultText.toZero}</p>}
                {resultText.toLimit && <p>{resultText.toLimit}</p>}
                <p className="text-xs text-gray-500">{t('results.disclaimer')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

