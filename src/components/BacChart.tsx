import React from 'react';
import { useTranslations } from 'next-intl';

type BacChartProps = {
  unit?: 'imperial' | 'metric';
};

// Simplified Widmark estimates for reference
// Values are approximate peak BAC % for Males. Females would be slightly higher.
// Columns: Drinks (1-8)
// Rows: Weight (lbs)
const IMPERIAL_DATA = [
  { weight: 100, drinks: [0.038, 0.075, 0.113, 0.150, 0.188, 0.225, 0.263, 0.300] },
  { weight: 120, drinks: [0.031, 0.063, 0.094, 0.125, 0.156, 0.188, 0.219, 0.250] },
  { weight: 140, drinks: [0.027, 0.054, 0.080, 0.107, 0.134, 0.161, 0.188, 0.214] },
  { weight: 160, drinks: [0.023, 0.047, 0.070, 0.094, 0.117, 0.141, 0.164, 0.188] },
  { weight: 180, drinks: [0.021, 0.042, 0.063, 0.083, 0.104, 0.125, 0.146, 0.167] },
  { weight: 200, drinks: [0.019, 0.038, 0.056, 0.075, 0.094, 0.113, 0.131, 0.150] },
  { weight: 220, drinks: [0.017, 0.034, 0.051, 0.068, 0.085, 0.102, 0.119, 0.136] },
  { weight: 240, drinks: [0.016, 0.031, 0.047, 0.063, 0.078, 0.094, 0.109, 0.125] },
];

export default function BacChart({ unit = 'imperial' }: BacChartProps) {
  const t = useTranslations('bacChart');

  // Simple color coding for BAC levels
  const getCellColor = (bac: number) => {
    if (bac < 0.02) return 'bg-emerald-50 text-emerald-700';
    if (bac < 0.05) return 'bg-emerald-100 text-emerald-800 font-medium';
    if (bac < 0.08) return 'bg-yellow-100 text-yellow-800 font-medium';
    if (bac < 0.15) return 'bg-orange-100 text-orange-800 font-semibold';
    return 'bg-red-100 text-red-800 font-bold';
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
            {IMPERIAL_DATA.map((row) => (
              <tr key={row.weight} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900 border-r border-slate-200 sticky left-0 bg-white z-10">
                  {unit === 'imperial' ? row.weight : Math.round(row.weight * 0.453592)}
                </td>
                {row.drinks.map((bac, idx) => (
                  <td
                    key={idx}
                    className={`p-3 text-center border-l border-slate-50 ${getCellColor(bac)}`}
                  >
                    {bac.toFixed(3)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-gray-500">
        <p>
          <strong>{t('chartNoteTitle')}:</strong> {t('chartNoteContent')}
        </p>
        <div className="mt-2 flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></span>
            <span>{t('legendSafe')} (&lt;0.05%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200"></span>
            <span>{t('legendCaution')} (0.05-0.08%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-100 border border-red-200"></span>
            <span>{t('legendDanger')} (&gt;0.08%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
