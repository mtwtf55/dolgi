import { compareAsc } from "date-fns";
import type { DebtStoreState } from "./use-debt-store.types";
import { hasReturnDate } from "./use-debt-store.utils";

export const selectDebtorsSummary = (state: DebtStoreState) => {
  const map = state.debtHistory.reduce((acc, { to, amount }) => {
    acc.set(to, (acc.get(to) || 0) + amount);
    return acc;
  }, new Map<string, number>());

  return Object.fromEntries(map.entries());
};

export const selectUpcomingReturns = (state: DebtStoreState) => {
  const itemsWithReturnDate = state.debtHistory
    .filter(hasReturnDate)
    .sort((a, b) => compareAsc(a.returnDate, b.returnDate));

  return itemsWithReturnDate;
};
