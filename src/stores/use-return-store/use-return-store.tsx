import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RETURN_STORE_PERSIST_KEY } from './use-return-store.constants';
import type {
  CreateReturnItemPayload,
  ReturnItem,
  UseReturnStoreState,
} from './use-return-store.types';

export const useReturnStore = create<UseReturnStoreState>()(
  persist(() => ({ items: [] as ReturnItem[] }), { name: RETURN_STORE_PERSIST_KEY }),
);

export const createReturnItem = (payload: CreateReturnItemPayload) => {
  const { historyItemId, returnDate } = payload;

  const findResult = useReturnStore
    .getState()
    .items.find((item) => item.historyItemId === historyItemId);

  if (findResult) {
    throw new Error(`Record with the same historyItemId already exists`);
  }

  useReturnStore.setState((state) => ({ items: [...state.items, { historyItemId, returnDate }] }));
};
