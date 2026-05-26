import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorById } from '@/stores/use-debtors-store/use-debtors-store.selectors';
import { selectDebtorHistory, useHistoryStore } from '@/stores/use-history-store';
import { getFullName, getInitials } from '@/utils';
import { DebtHistoryItem } from '@components/debt-history-item';
import { createFileRoute } from '@tanstack/react-router';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { Separator } from '@ui/separator';
import { useShallow } from 'zustand/shallow';

export const Route = createFileRoute('/debtors/$debtorId')({
  component: DebtorInfo,
});

function DebtorInfo() {
  const { debtorId } = Route.useParams();

  const debtorHistory = useHistoryStore(
    useShallow((state) => selectDebtorHistory(state, debtorId)),
  );
  const debtor = useDebtorsStore(useShallow((state) => selectDebtorById(state, debtorId)));

  const totalDebt = debtorHistory.reduce((acc, item) => acc + item.amount, 0);
  const initials = getInitials(getFullName(debtor.firstName, debtor.lastName));

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 items-center">
        <Avatar className="size-15">
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl">{getFullName(debtor.firstName, debtor.lastName)}</h2>
        <p className="border py-2 px-8 rounded-xl shadow">
          Общий долг: <b>{totalDebt} BYN</b>
        </p>
      </section>
      <Separator />
      <section className="flex flex-col gap-2">
        {debtorHistory.map((item) => (
          <DebtHistoryItem key={item.id} itemId={item.id} />
        ))}
      </section>
    </main>
  );
}
