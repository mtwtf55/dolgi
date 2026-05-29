import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useDebtorsStore } from '../use-debtors-store/use-debtors-store';
import { DEBTORS_STORE_PERSIST_KEY } from '../use-debtors-store/use-debtors-store.constants';
import { useHistoryStore } from '../use-history-store';
import { HISTORY_STORE_PERSIST_KEY } from '../use-history-store/use-history-store.constants';
import { useReturnStore } from '../use-return-store/use-return-store';
import { RETURN_STORE_PERSIST_KEY } from '../use-return-store/use-return-store.constants';
import { SETTINGS_STORE_PERSIST_KEY } from './use-settings-store.constants';
import { type UseSettingsStoreState } from './use-settings-store.types';

export const useSettingsStore = create<UseSettingsStoreState>()(
  persist(
    () => ({ showHistoryMarkers: false, showOverdueDebtors: false }) as UseSettingsStoreState,
    {
      name: SETTINGS_STORE_PERSIST_KEY,
    },
  ),
);

export const showHistoryMarkers = (flag: boolean) => {
  useSettingsStore.setState((state) => ({ ...state, showHistoryMarkers: flag }));
};

export const showOverdueDebtors = (flag: boolean) => {
  useSettingsStore.setState((state) => ({ ...state, showOverdueDebtors: flag }));
};

export const deleteAllData = () => {
  localStorage.removeItem(SETTINGS_STORE_PERSIST_KEY);
  localStorage.removeItem(HISTORY_STORE_PERSIST_KEY);
  localStorage.removeItem(RETURN_STORE_PERSIST_KEY);
  localStorage.removeItem(DEBTORS_STORE_PERSIST_KEY);

  useSettingsStore.setState(useSettingsStore.getInitialState());
  useHistoryStore.setState(useHistoryStore.getInitialState());
  useDebtorsStore.setState(useDebtorsStore.getInitialState());
  useReturnStore.setState(useReturnStore.getInitialState());
};
