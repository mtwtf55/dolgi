import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { useHistoryStore } from '@/stores/use-history-store';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

export const useDebtorsSummary = () => {
  const history = useHistoryStore(useShallow((state) => state.history));
  const debtors = useDebtorsStore(useShallow((state) => state.debtors));

  const historySummary = useMemo(() => {
    const map = history.reduce((acc, { actorId, amount }) => {
      acc.set(actorId, (acc.get(actorId) || 0) + amount);
      return acc;
    }, new Map<string, number>());

    return [...map.entries()];
  }, [history]);

  const debtorsSummary = useMemo(() => {
    return debtors.map((item) => {
      const debtorSummary = historySummary.find(([actorId]) => actorId === item.id);

      return { ...item, total: debtorSummary ? debtorSummary[1] : 0 };
    });
  }, [historySummary, debtors]);

  return debtorsSummary;
};
