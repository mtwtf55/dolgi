import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorsSummary, useHistoryStore } from '@/stores/use-history-store';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

export const useDebtorsSummary = () => {
  const historySummary = useHistoryStore(useShallow(selectDebtorsSummary));
  const debtors = useDebtorsStore(useShallow((state) => state.debtors));

  return useMemo(() => {
    return debtors.map((item) => {
      const debtorSummary = historySummary.find(([actorId]) => actorId === item.id);

      return { ...item, total: debtorSummary ? debtorSummary[1] : 0 };
    });
  }, [historySummary, debtors]);
};
