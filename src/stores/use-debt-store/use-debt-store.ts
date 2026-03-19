import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DebtStoreActions, DebtStoreState } from "./use-debt-store.types";
import { DEPT_STORE_PERSIST_KEY } from "./use-debt-store.constants";
import { format } from "date-fns";
import { DateFormatters } from "@/constants/date";

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
              createdAt: format(new Date(), DateFormatters.ISO_DATE),
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
