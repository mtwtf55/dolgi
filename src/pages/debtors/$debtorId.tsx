import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorById } from '@/stores/use-debtors-store/use-debtors-store.selectors';
import { selectDebtorHistory, useHistoryStore } from '@/stores/use-history-store';
import { getFullName, getInitials } from '@/utils';
import { DebtHistoryItem } from '@components/debt-history-item';
import { ReturnDebtDialog } from '@components/return-debt-dialog';
import { createFileRoute } from '@tanstack/react-router';
import { Avatar, AvatarFallback } from '@ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Separator } from '@ui/separator';
import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const Route = createFileRoute('/debtors/$debtorId')({
  component: DebtorInfo,
});

function DebtorInfo() {
  const { debtorId } = Route.useParams();
  const [isReturnDebtDialogShown, setIsReturnDebtDialogShown] = useState(false);

  const debtorHistory = useHistoryStore(
    useShallow((state) => selectDebtorHistory(state, debtorId)),
  );
  const debtor = useDebtorsStore(useShallow((state) => selectDebtorById(state, debtorId)));

  const totalDebt = debtorHistory.reduce((acc, item) => acc + item.amount, 0);
  const initials = getInitials(getFullName(debtor.firstName, debtor.lastName));

  const handleDecreaseDebt = () => setIsReturnDebtDialogShown(true);

  return (
    <>
      <DropdownMenu>
        <main className="flex flex-col gap-4">
          <section className="flex flex-col gap-2 items-center">
            <Avatar className="size-15">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl">{getFullName(debtor.firstName, debtor.lastName)}</h2>
            <DropdownMenuTrigger asChild>
              <p className="border py-2 px-8 rounded-xl shadow">
                Общий долг: <b>{totalDebt} BYN</b>
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1" avoidCollisions side="bottom" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="p-2 text-green-700 justify-center"
                  onClick={handleDecreaseDebt}
                  disabled={totalDebt <= 0}
                >
                  <BadgeCheck />
                  Списать долг
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </section>
          <Separator />
          <section className="flex flex-col gap-2">
            {debtorHistory.map((item) => (
              <DebtHistoryItem key={item.id} itemId={item.id} />
            ))}
          </section>
        </main>
      </DropdownMenu>
      <ReturnDebtDialog
        open={isReturnDebtDialogShown}
        onOpenChange={setIsReturnDebtDialogShown}
        actorId={debtorId}
      />
    </>
  );
}
