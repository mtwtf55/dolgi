import type { HistoryItem, HistoryStoreState } from './use-history-store.types';

export const selectDebtorsSummary = (state: HistoryStoreState) => {
  const map = state.history.reduce((acc, { actorId, amount }) => {
    acc.set(actorId, (acc.get(actorId) || 0) + amount);
    return acc;
  }, new Map<string, number>());

  return [...map.entries()];
};

export const selectDebtorHistory = (state: HistoryStoreState, debtorKey: string) => {
  return state.history.filter((item) => item.actorId === debtorKey);
};

export const selectActorId = (state: HistoryStoreState, historyId: HistoryItem['id']) => {
  const findResult = state.history.find((item) => item.id === historyId);

  if (!findResult) {
    throw new Error('Not found');
  }

  return findResult.actorId;
};
