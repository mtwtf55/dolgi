import { compareAsc } from "date-fns";
import type { DebtStoreState } from "./use-debt-store.types";
import { hasReturnDate } from "./use-debt-store.utils";

export const selectDebtorsSummary = (state: DebtStoreState) => {
  const map = state.debtHistory.reduce((acc, { to: { name }, amount }) => {
    acc.set(name, (acc.get(name) || 0) + amount);
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

export const selectDebtorHistory = (state: DebtStoreState, key: string) => {
  return state.debtHistory.filter((item) => item.to.key === key);
};

export const selectDebtorNameByKey = (state: DebtStoreState, key: string) => {
  const findResult = state.debtHistory.find((item) => item.to.key === key);

  return findResult ? findResult.to.name : null;
};
