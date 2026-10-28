export type Theme = 'system' | 'light' | 'dark';

export type UseSettingsStoreState = {
  theme: Theme;
  showHistoryMarkers: boolean;
  showOverdueDebtors: boolean;
  setPassword: boolean;
  useBiometric: boolean;
};
