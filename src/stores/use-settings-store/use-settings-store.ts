import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useDebtorsStore } from '../use-debtors-store/use-debtors-store';
import { DEBTORS_STORE_PERSIST_KEY } from '../use-debtors-store/use-debtors-store.constants';
import { useHistoryStore } from '../use-history-store';
import { HISTORY_STORE_PERSIST_KEY } from '../use-history-store/use-history-store.constants';
import { useReturnStore } from '../use-return-store/use-return-store';
import { RETURN_STORE_PERSIST_KEY } from '../use-return-store/use-return-store.constants';
import {
  BIOMETRIC_CREDENTIAL_ID_KEY,
  SETTINGS_STORE_PERSIST_KEY,
  USER_PASSWORD_HASH_KEY,
} from './use-settings-store.constants';
import { type Theme, type UseSettingsStoreState } from './use-settings-store.types';

export const useSettingsStore = create<UseSettingsStoreState>()(
  persist(
    () =>
      ({
        theme: 'system',
        showHistoryMarkers: false,
        showOverdueDebtors: false,
        setPassword: false,
        useBiometric: false,
      }) as UseSettingsStoreState,
    {
      name: SETTINGS_STORE_PERSIST_KEY,
    },
  ),
);

export const setTheme = (theme: Theme) => {
  useSettingsStore.setState((state) => ({ ...state, theme }));
};

export const showHistoryMarkers = (flag: boolean) => {
  useSettingsStore.setState((state) => ({ ...state, showHistoryMarkers: flag }));
};

export const showOverdueDebtors = (flag: boolean) => {
  useSettingsStore.setState((state) => ({ ...state, showOverdueDebtors: flag }));
};

export const setPassword = (flag: boolean) => {
  useSettingsStore.setState((state) => ({ ...state, setPassword: flag }));
};

export const setBiometric = (flag: boolean) => {
  useSettingsStore.setState((state) => ({ ...state, useBiometric: flag }));
};

export const deleteAllData = () => {
  localStorage.removeItem(SETTINGS_STORE_PERSIST_KEY);
  localStorage.removeItem(BIOMETRIC_CREDENTIAL_ID_KEY);
  localStorage.removeItem(HISTORY_STORE_PERSIST_KEY);
  localStorage.removeItem(RETURN_STORE_PERSIST_KEY);
  localStorage.removeItem(DEBTORS_STORE_PERSIST_KEY);

  useSettingsStore.setState(useSettingsStore.getInitialState());
  useHistoryStore.setState(useHistoryStore.getInitialState());
  useDebtorsStore.setState(useDebtorsStore.getInitialState());
  useReturnStore.setState(useReturnStore.getInitialState());
};

export const savePasswordHash = (hash: string) => {
  localStorage.setItem(USER_PASSWORD_HASH_KEY, hash);
};

export const removePasswordHash = () => {
  localStorage.removeItem(USER_PASSWORD_HASH_KEY);
};

export const saveBiometricCredentialId = (credentialId: string) => {
  localStorage.setItem(BIOMETRIC_CREDENTIAL_ID_KEY, credentialId);
};

export const getBiometricCredentialId = () => localStorage.getItem(BIOMETRIC_CREDENTIAL_ID_KEY);

export const removeBiometricCredentialId = () => {
  localStorage.removeItem(BIOMETRIC_CREDENTIAL_ID_KEY);
};

export const isPasswordCorrect = (hash: string) => {
  const hashFromStorage = localStorage.getItem(USER_PASSWORD_HASH_KEY);

  if (!hashFromStorage) return true;

  return hash === hashFromStorage;
};
