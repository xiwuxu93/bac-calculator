"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

type BacChartProps = {
  unit?: 'imperial' | 'metric';
};

// Simplified Widmark estimates for reference
// Values are approximate peak BAC % for Males (r=0.68).
// Columns: Drinks (1-8)
// Rows: Weight (lbs)
const IMPERIAL_DATA_MALE = [
  { weight: 100, drinks: [0.038, 0.075, 0.113, 0.150, 0.188, 0.225, 0.263, 0.300] },
  { weight: 120, drinks: [0.031, 0.063, 0.094, 0.125, 0.156, 0.188, 0.219, 0.250] },
  { weight: 140, drinks: [0.027, 0.054, 0.080, 0.107, 0.134, 0.161, 0.188, 0.214] },
  { weight: 160, drinks: [0.023, 0.047, 0.070, 0.094, 0.117, 0.141, 0.164, 0.188] },
  { weight: 180, drinks: [0.021, 0.042, 0.063, 0.083, 0.104, 0.125, 0.146, 0.167] },
  { weight: 200, drinks: [0.019, 0.038, 0.056, 0.075, 0.094, 0.113, 0.131, 0.150] },
  { weight: 220, drinks: [0.017, 0.034, 0.051, 0.068, 0.085, 0.102, 0.119, 0.136] },
  { weight: 240, drinks: [0.016, 0.031, 0.047, 0.063, 0.078, 0.094, 0.109, 0.125] },
];

// Values are approximate peak BAC % for Females (r=0.55).
// Calculated as Male_Value * (0.68/0.55)
const IMPERIAL_DATA_FEMALE = [
  { weight: 100, drinks: [0.047, 0.093, 0.140, 0.186, 0.233, 0.279, 0.326, 0.372] },
  { weight: 120, drinks: [0.039, 0.078, 0.116, 0.155, 0.194, 0.233, 0.271, 0.310] },
  { weight: 140, drinks: [0.033, 0.066, 0.100, 0.133, 0.166, 0.199, 0.233, 0.266] },
  { weight: 160, drinks: [0.029, 0.058, 0.087, 0.116, 0.145, 0.174, 0.203, 0.232] },
  { weight: 180, drinks: [0.026, 0.052, 0.078, 0.103, 0.129, 0.155, 0.181, 0.207] },
  { weight: 200, drinks: [0.023, 0.047, 0.070, 0.093, 0.116, 0.140, 0.163, 0.186] },
  { weight: 220, drinks: [0.021, 0.042, 0.064, 0.085, 0.106, 0.127, 0.148, 0.169] },
  { weight: 240, drinks: [0.019, 0.039, 0.058, 0.078, 0.097, 0.116, 0.136, 0.155] },
];

export default function BacChart({ unit = 'imperial' }: BacChartProps) {
  const t = useTranslations('bacChart');
  const [sex, setSex] = useState<'male' | 'female'>('male');

  const data = sex === 'male' ? IMPERIAL_DATA_MALE : IMPERIAL_DATA_FEMALE;

  // Simple color coding for BAC levels
  const getCellColor = (bac: number) => {
    if (bac < 0.02) return 'bg-emerald-50 text-emerald-700';
    if (bac < 0.05) return 'bg-emerald-100 text-emerald-800 font-medium';
    if (bac < 0.08) return 'bg-yellow-100 text-yellow-800 font-medium';
    if (bac < 0.15) return 'bg-orange-100 text-orange-800 font-semibold';
    return 'bg-red-100 text-red-800 font-bold';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">{t('genderLabel')}</span>
          <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
            <button
              onClick={() => setSex('male')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                sex === 'male'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-slate-50'
              }`}
            >
              {t('male')}
            </button>
            <button
              onClick={() => setSex('female')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                sex === 'female'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-slate-50'
              }`}
            >
              {t('female')}
            </button>
          </div>
        </div>
        
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors print:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          {t('printButton')}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm print:shadow-none print:border-none">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-gray-900 border-r border-slate-200 sticky left-0 bg-slate-50 z-10 w-32">
                  {t('weightLabel')} ({unit === 'imperial' ? 'lbs' : 'kg'})
                </th>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((drinkNum) => (
                  <th key={drinkNum} className="p-4 font-semibold text-gray-900 text-center min-w-[60px]">
                    {drinkNum} <span className="hidden sm:inline">{t('drinkUnit')}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr key={row.weight} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                    {unit === 'imperial' ? row.weight : Math.round(row.weight * 0.453592)}
                  </td>
                  {row.drinks.map((bac, idx) => (
                    <td
                      key={idx}
                      className={`p-3 text-center border-l border-slate-50 ${getCellColor(bac)} print:border-slate-300`}
                    >
                      {bac.toFixed(3)}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-gray-500 print:bg-white print:border-t-2">
          <p>
            <strong>{t('chartNoteTitle')}:</strong> {t('chartNoteContent')}
          </p>
          <div className="mt-2 flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200 print:bg-gray-100 print:border-gray-400"></span>
              <span>{t('legendSafe')} (&lt;0.05%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200 print:bg-gray-300 print:border-gray-600"></span>
              <span>{t('legendCaution')} (0.05-0.08%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-100 border border-red-200 print:bg-gray-500 print:border-gray-800"></span>
              <span>{t('legendDanger')} (&gt;0.08%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}