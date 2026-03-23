import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEPT_STORE_PERSIST_KEY } from "./use-debt-store.constants";
import type { DebtStoreActions, DebtStoreState } from "./use-debt-store.types";
import { slugifyToLatin } from "@/utils";

export const useDebtStore = create<DebtStoreState & DebtStoreActions>()(
  persist(
    (set) => ({
      debtHistory: [],
      lend: (payload) =>
        set((state) => {
          const debtorKey = slugifyToLatin(payload.to);

          const existingDebtor = state.debtHistory.find(
            ({ to: { key } }) => key === debtorKey,
          );

          return {
            debtHistory: [
              {
                ...payload,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                to: {
                  name: existingDebtor ? existingDebtor.to.name : payload.to,
                  key: debtorKey,
                },
              },
              ...state.debtHistory,
            ],
          };
        }),
    }),
    {
      name: DEPT_STORE_PERSIST_KEY,
    },
  ),
);
