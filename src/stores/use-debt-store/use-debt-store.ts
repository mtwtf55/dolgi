import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEPT_STORE_PERSIST_KEY } from "./use-debt-store.constants";
import type {
  DebtStoreHistoryItem,
  DebtStoreState,
  LendActionPayload,
} from "./use-debt-store.types";
import { slugifyToLatin } from "@/utils";

export const useDebtStore = create<DebtStoreState>()(
  persist(() => ({ debtHistory: [] as DebtStoreHistoryItem[] }), {
    name: DEPT_STORE_PERSIST_KEY,
  }),
);

export const lend = (payload: LendActionPayload) =>
  useDebtStore.setState((state) => {
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
  });

export const getDebtorKeyByName = (name: string): string | null => {
  const { debtHistory } = useDebtStore.getState();

  const debtor = debtHistory.find(
    ({ to: { name: debtorName } }) => debtorName === name,
  );

  return debtor ? debtor.to.key : null;
};

export const returnDebt = (id: string) => {
  useDebtStore.setState((state) => ({
    debtHistory: state.debtHistory.map((item) =>
      item.id === id ? { ...item, returnDebt: undefined } : item,
    ),
  }));
};
