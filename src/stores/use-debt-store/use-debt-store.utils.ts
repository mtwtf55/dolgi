import type { DebtStoreHistoryItem } from "./use-debt-store.types";

export const hasReturnDate = (
  item: DebtStoreHistoryItem,
): item is DebtStoreHistoryItem &
  Required<Pick<DebtStoreHistoryItem, "returnDate">> =>
  item.returnDate !== undefined;
