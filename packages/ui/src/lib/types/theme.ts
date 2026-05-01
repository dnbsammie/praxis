export type ThemeTokens = {
  bg: string;
  fg: string;
  accent: string;
  surface: string;
  border: string;
};

export type Theme = {
  name: string;
  tokens: Partial<ThemeTokens>;
};

export type UserSettings = {
  theme?: string;
  blur?: number;
  fontMono?: string;
};