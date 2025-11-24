import type enMessages from './en';

export type AppMessages = typeof enMessages;

export type DeepLocalized<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends null ? null :
  T extends undefined ? undefined :
  T extends readonly (infer U)[] ? ReadonlyArray<DeepLocalized<U>> :
  T extends Record<string, unknown> ? { [K in keyof T]: DeepLocalized<T[K]> } :
  T;
