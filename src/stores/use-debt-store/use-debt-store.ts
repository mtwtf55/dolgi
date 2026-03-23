import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEPT_STORE_PERSIST_KEY } from "./use-debt-store.constants";
import type { DebtStoreActions, DebtStoreState } from "./use-debt-store.types";

export const useDebtStore = create<DebtStoreState & DebtStoreActions>()(
  persist(
    (set) => ({
      debtHistory: [],
      lend: (payload) =>
        set((state) => ({
          debtHistory: [
            {
              ...payload,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
            ...state.debtHistory,
          ],
        })),
    }),
    {
      name: DEPT_STORE_PERSIST_KEY,
    },
  ),
);
