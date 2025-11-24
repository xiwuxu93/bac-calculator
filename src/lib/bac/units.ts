import type { BacUnit, WeightUnit } from './types';

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (from === to) {
    return value;
  }
  if (from === 'kg' && to === 'lb') {
    return value * 2.2046226218;
  }
  if (from === 'lb' && to === 'kg') {
    return value / 2.2046226218;
  }
  return value;
}

export function convertBac(value: number, from: BacUnit, to: BacUnit): number {
  if (from === to) {
    return value;
  }

  let percentValue: number;

  if (from === 'percent') {
    percentValue = value;
  } else if (from === 'permille') {
    percentValue = value / 10;
  } else {
    // mg/dL to %BAC: 0.08% ≈ 80 mg/dL => % = mg/dL / 1000
    percentValue = value / 1000;
  }

  if (to === 'percent') {
    return percentValue;
  }
  if (to === 'permille') {
    return percentValue * 10;
  }
  // %BAC to mg/dL
  return percentValue * 1000;
}
