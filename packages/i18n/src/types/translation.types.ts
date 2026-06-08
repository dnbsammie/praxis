export type TranslationValue = string | number | boolean | TranslationObject;

export interface TranslationObject {
  [key: string]: TranslationValue;
}
