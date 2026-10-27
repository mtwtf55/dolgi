import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { useHistoryStore } from '@/stores/use-history-store';
import { useReturnStore } from '@/stores/use-return-store/use-return-store';
import { roundMoney } from '@/utils';
import { isBefore } from 'date-fns';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

export const useDebtorsSummary = () => {
  const history = useHistoryStore(useShallow((state) => state.history));
  const debtors = useDebtorsStore(useShallow((state) => state.debtors));
  const returns = useReturnStore(useShallow((state) => state.items));

  const historySummary = useMemo(() => {
    const map = history.reduce((acc, { actorId, amount }) => {
      acc.set(actorId, roundMoney((acc.get(actorId) || 0) + amount));
      return acc;
    }, new Map<string, number>());

    return [...map.entries()];
  }, [history]);

  const overdueSummary = useMemo(() => {
    const returnsJoin = returns.map((item) => {
      const historyItem = history.find(({ id }) => id === item.historyItemId);

      if (!historyItem) {
        throw new Error('Unexpected behavior');
      }

      return { actorId: historyItem.actorId, returnDate: item.returnDate };
    });

    const summary = returnsJoin.reduce((acc, item) => {
      const isOverdue = isBefore(item.returnDate, new Date());
      const overdueCount = acc.get(item.actorId) ?? 0;
      acc.set(item.actorId, isOverdue ? overdueCount + 1 : overdueCount);

      return acc;
    }, new Map<string, number>());

    return summary;
  }, [history, returns]);

  const debtorsSummary = useMemo(() => {
    return debtors.map((item) => {
      const debtorSummary = historySummary.find(([actorId]) => actorId === item.id);
      const overdueCount = overdueSummary.get(item.id);

      return {
        ...item,
        total: debtorSummary ? debtorSummary[1] : 0,
        overdueCount: overdueCount ?? 0,
      };
    });
  }, [historySummary, debtors, overdueSummary]);

  return debtorsSummary;
};
