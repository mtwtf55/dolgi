import { useReturnStore } from '@/stores/use-return-store/use-return-store';
import { CreateDebtDialog } from '@components/create-debt-dialog';
import { NoDataPlaceholder } from '@components/no-data-placeholder';
import { UpcomingReturnCard } from '@components/upcoming-return-card';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Separator } from '@ui/separator';
import { compareAsc } from 'date-fns';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const returnStoreItems = useReturnStore(useShallow((state) => state.items));
  const [isCreateFormOpened, setIsCreateFormOpened] = useState(false);

  const upcomingReturns = useMemo(
    () => returnStoreItems.slice().sort((a, b) => compareAsc(a.returnDate, b.returnDate)),
    [returnStoreItems],
  );

  const handleOpenForm = () => setIsCreateFormOpened(true);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button size={'lg'} variant={'secondary'} className="h-10" onClick={handleOpenForm}>
          Дать в долг
        </Button>
        <section>
          <h3 className="font-medium">Ближайшие возвраты</h3>
          <Separator />
          {upcomingReturns.length !== 0 ? (
            <div className="pt-3 flex flex-col gap-1">
              {upcomingReturns.map(({ historyItemId, returnDate }) => (
                <UpcomingReturnCard
                  key={historyItemId}
                  itemId={historyItemId}
                  returnDate={returnDate}
                />
              ))}
            </div>
          ) : (
            <NoDataPlaceholder
              noIcon
              title="Ближайших возвратов пока нет"
              description="Чтобы отслеживать сроки, укажите дату возврата при создании долга."
            />
          )}
        </section>
      </div>
      <CreateDebtDialog open={isCreateFormOpened} onOpenChange={setIsCreateFormOpened} />
    </>
  );
}
