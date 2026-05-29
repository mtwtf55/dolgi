import type { Debtor } from '../use-debtors-store/use-debtors-store.types';
import type { HistoryItem } from '../use-history-store';
import type { UseReturnStoreState } from './use-return-store.types';

export const selectReturnDate = (state: UseReturnStoreState, historyItemId: HistoryItem['id']) => {
  const findResult = state.items.find((item) => item.historyItemId === historyItemId);

  return findResult ? new Date(findResult.returnDate) : null;
};