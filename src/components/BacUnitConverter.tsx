'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { BacUnit } from '@/lib/bac/types';
import { convertBac } from '@/lib/bac/units';

type BacUnitConverterProps = {
  defaultInputUnit?: BacUnit;
};

export default function BacUnitConverter({ defaultInputUnit = 'percent' }: BacUnitConverterProps) {
  const t = useTranslations('unitConversion.shared');
  const [value, setValue] = useState<string>('0.08');
  const [unit, setUnit] = useState<BacUnit>(defaultInputUnit);

  const parsed = useMemo(() => {
    const num = parseFloat(value.replace(',', '.'));
    if (!Number.isFinite(num)) {
      return null;
    }
    return num;
  }, [value]);

  const converted = useMemo(() => {
    if (parsed === null) {
      return null;
    }
    const percent = convertBac(parsed, unit, 'percent');
    const permille = convertBac(parsed, unit, 'permille');
    const mgPerDl = convertBac(parsed, unit, 'mgPerDl');
    return {
      percent: Number(percent.toFixed(3)),
      permille: Number(permille.toFixed(3)),
      mgPerDl: Number(mgPerDl.toFixed(1)),
    };
  }, [parsed, unit]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm md:p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">{t('formTitle')}</h2>
            <p className="text-sm text-gray-600">{t('formSubtitle')}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="converter-value" className="block text-sm font-medium text-gray-700">
              {t('inputLabel')}
            </label>
            <div className="flex gap-2">
              <input
                id="converter-value"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.001}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <select
                value={unit}
                onChange={(event) => setUnit(event.target.value as BacUnit)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="percent">{t('unitPercent')}</option>
                <option value="permille">{t('unitPermille')}</option>
                <option value="mgPerDl">{t('unitMgPerDl')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-gray-800 shadow-sm">
          {!converted && (
            <p className="text-sm text-gray-600">
              {t('approxNote')}
            </p>
          )}
          {converted && (
            <div className="space-y-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t('unitPercent')}
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {converted.percent}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t('unitPermille')}
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {converted.permille}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t('unitMgPerDl')}
                </div>
                <div className="text-base font-semibold text-gray-900">
                  {converted.mgPerDl}
                </div>
              </div>
              <p className="text-xs text-gray-500">{t('approxNote')}</p>
              <p className="text-xs text-gray-500">{t('disclaimer')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

