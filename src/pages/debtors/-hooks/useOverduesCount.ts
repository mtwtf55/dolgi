import { selectDebtorHistory, useHistoryStore } from '@/stores/use-history-store';
import { useReturnStore } from '@/stores/use-return-store/use-return-store';
import { isBefore } from 'date-fns';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

export const useOverduesCount = (actorId: string) => {
  const returns = useReturnStore(useShallow((state) => state.items));
  const history = useHistoryStore(useShallow((state) => selectDebtorHistory(state, actorId)));

  return useMemo(() => {
    const debtorReturns = returns.filter((item) =>
      history.find(({ id }) => id === item.historyItemId),
    );
    return debtorReturns.reduce(
      (acc, item) => (isBefore(item.returnDate, new Date()) ? acc + 1 : acc),
      0,
    );
  }, [returns, history]);
};
