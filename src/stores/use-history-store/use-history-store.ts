import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HISTORY_STORE_PERSIST_KEY } from './use-history-store.constants';
import type {
  CreateHistoryItemPayload,
  HistoryItem,
  HistoryStoreState,
} from './use-history-store.types';

export const useHistoryStore = create<HistoryStoreState>()(
  persist(() => ({ history: [] as HistoryItem[] }), {
    name: HISTORY_STORE_PERSIST_KEY,
  }),
);

export const createHistoryItem = (payload: CreateHistoryItemPayload) => {
  const historyItemId = crypto.randomUUID();

  useHistoryStore.setState((state) => {
    return {
      history: [
        {
          ...payload,
          id: historyItemId,
          createdAt: new Date(),
        },
        ...state.history,
      ],
    };
  });

  return historyItemId;
};
