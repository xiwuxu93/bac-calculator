'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { estimateBac, estimateTimeToZero } from '@/lib/bac/calculation';
import { LEGAL_LIMITS } from '@/lib/bac/constants';
import type {
  BacCalculationInput,
  BacEstimate,
  BacUnit,
  CountryCode,
  DrinkInput,
  DrinkType,
  Sex,
  TimeToZeroEstimate,
  WeightUnit,
} from '@/lib/bac/types';
import { convertBac, convertWeight } from '@/lib/bac/units';

type BacCalculatorProps = {
  defaultCountryCode?: CountryCode;
  defaultSex?: Sex;
  defaultWeight?: {
    value: number;
    unit: WeightUnit;
  };
  enableLocalStorage?: boolean;
};

type FormState = {
  sex: Sex;
  weight: number;
  weightUnit: WeightUnit;
  countryCode: CountryCode;
  timeHours: number;
  timeMinutes: number;
  drinks: DrinkInput[];
};

const STORAGE_KEY = 'safebac:defaults:v1';

const defaultDrink = (id: string): DrinkInput => ({
  id,
  type: 'beer',
  count: 2,
  volumeMl: 330,
  abvPercent: 5,
});

function parseStoredState(value: string | null): Partial<FormState> | null {
  if (!value) {
    return null;
  }
  try {
    const parsed = JSON.parse(value) as Partial<FormState>;
    return parsed;
  } catch {
    return null;
  }
}

export default function BacCalculator({
  defaultCountryCode = 'US',
  defaultSex = 'male',
  defaultWeight = { value: 75, unit: 'kg' },
  enableLocalStorage = true,
}: BacCalculatorProps) {
  const t = useTranslations('calculator');

  const [form, setForm] = useState<FormState>(() => ({
    sex: defaultSex,
    weight: defaultWeight.value,
    weightUnit: defaultWeight.unit,
    countryCode: defaultCountryCode,
    timeHours: 2,
    timeMinutes: 0,
    drinks: [defaultDrink('0')],
  }));

  const [selectedUnit, setSelectedUnit] = useState<BacUnit>('percent');
  const [result, setResult] = useState<BacEstimate | null>(null);
  const [timeToZero, setTimeToZero] = useState<TimeToZeroEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enableLocalStorage) {
      return;
    }
    const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
    const stored = parseStoredState(raw);
    if (stored) {
      setForm((prev) => ({
        ...prev,
        ...stored,
        drinks:
          stored.drinks && stored.drinks.length > 0
            ? stored.drinks.map((drink, index) => ({
                ...drink,
                id: drink.id ?? String(index),
              }))
            : prev.drinks,
      }));
    }
  }, [enableLocalStorage]);

  useEffect(() => {
    if (!enableLocalStorage || typeof window === 'undefined') {
      return;
    }
    const minimal: Partial<FormState> = {
      sex: form.sex,
      weight: form.weight,
      weightUnit: form.weightUnit,
      countryCode: form.countryCode,
      drinks: form.drinks.slice(0, 3),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
  }, [enableLocalStorage, form.sex, form.weight, form.weightUnit, form.countryCode, form.drinks]);

  const countryOptions: { code: CountryCode; label: string }[] = useMemo(
    () => [
      { code: 'US', label: t('countries.US') },
      { code: 'UK', label: t('countries.UK') },
      { code: 'AU', label: t('countries.AU') },
      { code: 'CA', label: t('countries.CA') },
      { code: 'NZ', label: t('countries.NZ') },
      { code: 'MA', label: t('countries.MA') },
      { code: 'DZ', label: t('countries.DZ') },
    ],
    [t],
  );

  const legalLimit = LEGAL_LIMITS[form.countryCode]?.general ?? null;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateDrink(id: string, patch: Partial<DrinkInput>) {
    setForm((prev) => ({
      ...prev,
      drinks: prev.drinks.map((drink) =>
        drink.id === id
          ? {
              ...drink,
              ...patch,
            }
          : drink,
      ),
    }));
  }

  function addDrink() {
    setForm((prev) => {
      const nextId = String(prev.drinks.length);
      return {
        ...prev,
        drinks: [...prev.drinks, defaultDrink(nextId)],
      };
    });
  }

  function removeDrink(id: string) {
    setForm((prev) => {
      const remaining = prev.drinks.filter((drink) => drink.id !== id);
      return {
        ...prev,
        drinks: remaining.length > 0 ? remaining : [defaultDrink('0')],
      };
    });
  }

  function handleUnitToggle(nextUnit: BacUnit) {
    setSelectedUnit(nextUnit);
  }

  function handleSwapWeightUnit() {
    setForm((prev) => {
      const nextUnit: WeightUnit = prev.weightUnit === 'kg' ? 'lb' : 'kg';
      const converted = convertWeight(prev.weight, prev.weightUnit, nextUnit);
      return {
        ...prev,
        weightUnit: nextUnit,
        weight: Number(converted.toFixed(1)),
      };
    });
  }

  function validateForm(): string | null {
    if (!form.weight || form.weight <= 0) {
      return t('errors.weightRequired');
    }
    if (form.timeHours < 0 || form.timeMinutes < 0) {
      return t('errors.timeInvalid');
    }
    const totalMinutes = form.timeHours * 60 + form.timeMinutes;
    if (totalMinutes <= 0) {
      return t('errors.timeRequired');
    }
    const validDrink = form.drinks.some(
      (drink) =>
        drink.count > 0 &&
        drink.volumeMl > 0 &&
        drink.abvPercent > 0 &&
        Number.isFinite(drink.count) &&
        Number.isFinite(drink.volumeMl) &&
        Number.isFinite(drink.abvPercent),
    );
    if (!validDrink) {
      return t('errors.drinksRequired');
    }
    return null;
  }

  function handleEstimate() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setResult(null);
      setTimeToZero(null);
      return;
    }
    setError(null);

    const input: BacCalculationInput = {
      sex: form.sex,
      weight: form.weight,
      weightUnit: form.weightUnit,
      countryCode: form.countryCode,
      timeSinceFirstDrinkHours: form.timeHours + form.timeMinutes / 60,
      drinks: form.drinks,
    };

    const estimate = estimateBac(input);
    const timeEstimate = estimateTimeToZero(estimate.bacPercent, estimate.legalLimit);

    setResult(estimate);
    setTimeToZero(timeEstimate);
  }

  function handleReset() {
    setForm({
      sex: defaultSex,
      weight: defaultWeight.value,
      weightUnit: defaultWeight.unit,
      countryCode: defaultCountryCode,
      timeHours: 2,
      timeMinutes: 0,
      drinks: [defaultDrink('0')],
    });
    setResult(null);
    setTimeToZero(null);
    setError(null);
  }

  function handleClearSavedDefaults() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  const convertedBacValue = useMemo(() => {
    if (!result) {
      return null;
    }
    const converted = convertBac(result.bacPercent, 'percent', selectedUnit);
    return Number(converted.toFixed(3));
  }, [result, selectedUnit]);

  const canEstimate = useMemo(() => !validateForm(), [form]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm md:p-6">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">{t('form.title')}</h2>
            <p className="text-sm text-gray-600">{t('form.subtitle')}</p>
          </div>

          {error && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {t('form.sexLabel')}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('sex', 'male')}
                    className={`flex-1 rounded-full border px-3 py-2 text-sm font-medium ${
                      form.sex === 'male'
                        ? 'border-sky-600 bg-sky-50 text-sky-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {t('form.sexMale')}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('sex', 'female')}
                    className={`flex-1 rounded-full border px-3 py-2 text-sm font-medium ${
                      form.sex === 'female'
                        ? 'border-sky-600 bg-sky-50 text-sky-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {t('form.sexFemale')}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  {t('form.weightLabel')}
                </label>
                <div className="flex gap-2">
                  <input
                    id="weight"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={form.weight}
                    onChange={(event) =>
                      updateField('weight', event.target.value === '' ? 0 : Number(event.target.value))
                    }
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleSwapWeightUnit}
                    className="whitespace-nowrap rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
                  >
                    {form.weightUnit === 'kg' ? t('form.weightUnitKg') : t('form.weightUnitLb')}
                  </button>
                </div>
                <p className="text-xs text-gray-500">{t('form.weightHelp')}</p>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {t('form.countryLabel')}
              </label>
              <select
                id="country"
                value={form.countryCode}
                onChange={(event) => updateField('countryCode', event.target.value as CountryCode)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {countryOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">{t('form.countryHelp')}</p>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t('form.timeSinceFirstDrinkLabel')}
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={form.timeHours}
                      onChange={(event) =>
                        updateField(
                          'timeHours',
                          event.target.value === '' ? 0 : Number(event.target.value),
                        )
                      }
                      className="mr-2 w-full border-none p-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                    />
                    <span className="text-xs text-gray-500">{t('form.timeHours')}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={59}
                      value={form.timeMinutes}
                      onChange={(event) =>
                        updateField(
                          'timeMinutes',
                          event.target.value === '' ? 0 : Number(event.target.value),
                        )
                      }
                      className="mr-2 w-full border-none p-0 text-sm text-gray-900 focus:outline-none focus:ring-0"
                    />
                    <span className="text-xs text-gray-500">{t('form.timeMinutes')}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">{t('form.timeHelp')}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">{t('drinks.sectionTitle')}</h3>
              <button
                type="button"
                onClick={addDrink}
                className="rounded-full border border-sky-600 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 hover:bg-sky-100"
              >
                {t('drinks.add')}
              </button>
            </div>
            <div className="space-y-3">
              {form.drinks.map((drink, index) => (
                <div
                  key={drink.id}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      {t('drinks.rowLabel', { index: index + 1 })}
                    </span>
                    {form.drinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDrink(drink.id)}
                        className="text-xs font-medium text-slate-500 hover:text-red-600"
                      >
                        {t('drinks.remove')}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        {t('drinks.type')}
                      </label>
                      <select
                        value={drink.type}
                        onChange={(event) =>
                          updateDrink(drink.id, { type: event.target.value as DrinkType })
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="beer">{t('drinks.typeBeer')}</option>
                        <option value="wine">{t('drinks.typeWine')}</option>
                        <option value="spirits">{t('drinks.typeSpirits')}</option>
                        <option value="other">{t('drinks.typeOther')}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        {t('drinks.count')}
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={drink.count}
                        onChange={(event) =>
                          updateDrink(
                            drink.id,
                            event.target.value === '' ? { count: 0 } : { count: Number(event.target.value) },
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        {t('drinks.volumeMl')}
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        value={drink.volumeMl}
                        onChange={(event) =>
                          updateDrink(
                            drink.id,
                            event.target.value === ''
                              ? { volumeMl: 0 }
                              : { volumeMl: Number(event.target.value) },
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        {t('drinks.abv')}
                      </label>
                      <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step={0.1}
                          value={drink.abvPercent}
                          onChange={(event) =>
                            updateDrink(
                              drink.id,
                              event.target.value === ''
                                ? { abvPercent: 0 }
                                : { abvPercent: Number(event.target.value) },
                            )
                          }
                          className="mr-1 w-full border-none p-0 text-xs text-gray-900 focus:outline-none focus:ring-0"
                        />
                        <span className="text-[10px] text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {enableLocalStorage && (
              <button
                type="button"
                onClick={handleClearSavedDefaults}
                className="text-xs font-medium text-slate-500 underline-offset-2 hover:underline"
              >
                {t('form.clearSavedDefaults')}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleEstimate}
              disabled={!canEstimate}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm ${
                canEstimate
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'bg-slate-300 text-slate-600'
              }`}
            >
              {t('actions.estimate')}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400"
            >
              {t('actions.reset')}
            </button>
            <p className="text-xs text-gray-500">{t('actions.disclaimerShort')}</p>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">{t('results.title')}</h2>
            <p className="text-xs text-gray-600">{t('results.subtitle')}</p>
          </div>

          {!result && (
            <p className="text-sm text-gray-600">{t('results.placeholder')}</p>
          )}

          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {t('results.bacLabel')}
                </span>
                <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('percent')}
                    className={`rounded-full px-2 py-0.5 ${
                      selectedUnit === 'percent'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    {t('results.unitPercent')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('permille')}
                    className={`rounded-full px-2 py-0.5 ${
                      selectedUnit === 'permille'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    {t('results.unitPermille')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('mgPerDl')}
                    className={`rounded-full px-2 py-0.5 ${
                      selectedUnit === 'mgPerDl'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    {t('results.unitMgPerDl')}
                  </button>
                </div>
              </div>

              {convertedBacValue !== null && (
                <div className="flex items-baseline gap-3">
                  <div className="text-4xl font-semibold tracking-tight text-slate-900">
                    {convertedBacValue}
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>
                      {selectedUnit === 'percent' && t('results.percentSuffix')}
                      {selectedUnit === 'permille' && t('results.permilleSuffix')}
                      {selectedUnit === 'mgPerDl' && t('results.mgPerDlSuffix')}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {t('results.estimateNote')}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    result.risk.level === 'high'
                      ? 'border-red-300 bg-red-50 text-red-800'
                      : result.risk.level === 'medium'
                      ? 'border-amber-300 bg-amber-50 text-amber-800'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wide">
                    {t(`risk.label.${result.risk.level}`)}
                  </div>
                  <p className="mt-0.5 text-sm">
                    {t(result.risk.messageKey, {
                      bac: result.bacPercent.toFixed(3),
                    })}
                  </p>
                </div>

                <div className="space-y-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-gray-700">
                  {legalLimit != null ? (
                    <>
                      <p>
                        {t('results.legalLimitKnown', {
                          limit: legalLimit.toFixed(3),
                        })}
                      </p>
                      {result.overLegalLimit === true && (
                        <p className="font-semibold text-red-700">
                          {t('results.overLegalLimit')}
                        </p>
                      )}
                      {result.overLegalLimit === false && (
                        <p className="font-semibold text-amber-700">
                          {t('results.underLegalLimit')}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>{t('results.legalLimitUnknown')}</p>
                  )}
                  <p>{t('results.legalDisclaimer')}</p>
                </div>

                {timeToZero && (
                  <div className="space-y-1 rounded-lg bg-slate-50 px-3 py-2 text-xs text-gray-700">
                    {timeToZero.toZeroHoursRange && (
                      <p>
                        {t('results.timeToZero', {
                          from: timeToZero.toZeroHoursRange[0].toFixed(1),
                          to: timeToZero.toZeroHoursRange[1].toFixed(1),
                        })}
                      </p>
                    )}
                    {timeToZero.toLegalLimitHoursRange && (
                      <p>
                        {t('results.timeToLegalLimit', {
                          from: timeToZero.toLegalLimitHoursRange[0].toFixed(1),
                          to: timeToZero.toLegalLimitHoursRange[1].toFixed(1),
                        })}
                      </p>
                    )}
                    <p>{t('results.timeDisclaimer')}</p>
                  </div>
                )}

                <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-gray-700">
                  <p className="font-semibold">{t('results.safetyTitle')}</p>
                  <p>{t('results.safetyContent')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

