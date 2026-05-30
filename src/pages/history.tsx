import { cn } from '@/lib/utils';
import { selectHistoryByRange, useHistoryStore } from '@/stores/use-history-store';
import { DebtHistoryItem } from '@components/debt-history-item';
import { NoDataPlaceholder } from '@components/no-data-placeholder';
import { createFileRoute } from '@tanstack/react-router';
import { RangePicker } from '@ui/range-picker';
import { Separator } from '@ui/separator';
import { endOfDay, startOfDay, subMonths } from 'date-fns';
import { useDeferredValue, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { useShallow } from 'zustand/shallow';

export const Route = createFileRoute('/history')({
  component: History,
});

const initialRange: DateRange = {
  from: startOfDay(subMonths(new Date(), 1)),
  to: endOfDay(new Date()),
};

function History() {
  const [range, setRange] = useState<DateRange>(initialRange);
  const deferredRange = useDeferredValue(range);
  const historyItems = useHistoryStore(
    useShallow((state) => selectHistoryByRange(state, deferredRange)),
  );
  const hasItems = historyItems.length !== 0;
  const isStale = range !== deferredRange;

  const handleRangeChanged = (range: DateRange | undefined) => {
    setRange(range ?? initialRange);
  };

  return (
    <div className="flex flex-col">
      <RangePicker dateRange={range} onRangeChanged={handleRangeChanged} />
      <h3 className="font-medium mt-2 mb-1">История операций</h3>
      <Separator className="mb-2" />
      {hasItems ? (
        <div
          className={cn(
            'flex flex-col gap-1 transition-opacity duration-200',
            isStale && 'opacity-50 pointer-events-none',
          )}
        >
          {historyItems.map((item) => (
            <DebtHistoryItem key={item.id} itemId={item.id} />
          ))}
        </div>
      ) : (
        <NoDataPlaceholder
          title="Тут пока пусто"
          description="Здесь будут отображаться все ваши транзакции по займам и возвратам за выбранный период"
          className="pt-2 gap-2"
        />
      )}
    </div>
  );
}
