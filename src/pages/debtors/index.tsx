import { getFullName } from '@/utils';
import { CreateDebtorDialog } from '@components/create-debtor-dialog';
import { DebtorCard } from '@components/debtor-card';
import { NoDataPlaceholder } from '@components/no-data-placeholder';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Separator } from '@ui/separator';
import { useState } from 'react';
import { useDebtorsSummary } from './-hooks/useDebtorsSummary';

export const Route = createFileRoute('/debtors/')({
  component: Debtors,
});

function Debtors() {
  const summary = useDebtorsSummary();
  const navigate = useNavigate();
  const [isCreateDebtorDialogOpened, setIsCreateDebtorDialogOpened] = useState(false);

  const handleDebtorSelected = (debtorId: string) => () => {
    navigate({ to: '/debtors/$debtorId', params: { debtorId } });
  };

  const handleAddDebtor = () => setIsCreateDebtorDialogOpened(true);

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between pb-1">
          <h3 className="font-medium">Список должников</h3>
          <Button variant="secondary" onClick={handleAddDebtor}>
            Добавить должника
          </Button>
        </div>
        <Separator />
        <div className="pt-2 flex flex-col gap-2">
          {summary.length !== 0 ? (
            summary.map(({ firstName, id, total, lastName, overdueCount }) => (
              <DebtorCard
                key={id}
                amount={total}
                name={getFullName(firstName, lastName)}
                onClick={handleDebtorSelected(id)}
                hasOverdues={overdueCount > 0}
              />
            ))
          ) : (
            <NoDataPlaceholder
              title="Список должников пуст"
              description="И это отличная новость"
              className="gap-2 pt-2"
            />
          )}
        </div>
      </div>
      <CreateDebtorDialog
        open={isCreateDebtorDialogOpened}
        onOpenChange={setIsCreateDebtorDialogOpened}
      />
    </>
  );
}
