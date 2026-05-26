import { useReturnStore } from '@/stores/use-return-store/use-return-store';
import { CreateDebtForm } from '@components/create-debt-form';
import { NoDataPlaceholder } from '@components/no-data-placeholder';
import { UpcomingReturnCard } from '@components/upcoming-return-card';
import { createFileRoute } from '@tanstack/react-router';
import { Separator } from '@ui/separator';
import { compareAsc } from 'date-fns';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const returnStoreItems = useReturnStore(useShallow((state) => state.items));

  const upcomingReturns = useMemo(
    () => returnStoreItems.slice().sort((a, b) => compareAsc(a.returnDate, b.returnDate)),
    [returnStoreItems],
  );

  return (
    <div className="flex flex-col gap-4">
      <CreateDebtForm />
      <section>
        {upcomingReturns.length !== 0 ? (
          <>
            <h3 className="font-medium">Ближайшие возвраты</h3>
            <Separator />
            <div className="pt-3 flex flex-col gap-1">
              {upcomingReturns.map(({ historyItemId, returnDate }) => (
                <UpcomingReturnCard
                  key={historyItemId}
                  itemId={historyItemId}
                  returnDate={returnDate}
                />
              ))}
            </div>
          </>
        ) : (
          <NoDataPlaceholder
            noIcon
            title="Ближайших возвратов пока нет"
            description="Чтобы отслеживать сроки, укажите дату возврата при создании долга."
          />
        )}
      </section>
    </div>
  );
}
