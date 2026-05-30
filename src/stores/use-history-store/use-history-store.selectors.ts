import { endOfDay, isAfter, isBefore, startOfDay } from 'date-fns';
import type { DateRange } from 'react-day-picker';
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

export const selectItemById = (state: HistoryStoreState, id: HistoryItem['id']) => {
  const findResult = state.history.find((item) => item.id === id);

  if (!findResult) {
    throw new Error('Not found');
  }

  return findResult;
};

export const selectHistoryItemAmout = (state: HistoryStoreState, id: HistoryItem['id']) => {
  const findResult = state.history.find((item) => item.id === id);

  if (!findResult) {
    throw new Error('Not found');
  }

  return findResult.amount;
};

export const selectHistoryByRange = (state: HistoryStoreState, range: DateRange) => {
  if (range.from && range.to) {
    const { from, to } = range;
    return state.history.filter(
      ({ createdAt }) => isBefore(createdAt, endOfDay(to)) && isAfter(createdAt, startOfDay(from)),
    );
  }
  return state.history;
};
