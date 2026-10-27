import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorById } from '@/stores/use-debtors-store/use-debtors-store.selectors';
import { selectDebtorHistory, useHistoryStore } from '@/stores/use-history-store';
import { useSettingsStore } from '@/stores/use-settings-store';
import { getFullName, getInitials, roundMoney } from '@/utils';
import { DebtHistoryItem } from '@components/debt-history-item';
import { ReturnDebtDialog } from '@components/return-debt-dialog';
import { createFileRoute } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarOverdue } from '@ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Separator } from '@ui/separator';
import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { useOverduesCount } from './-hooks/useOverduesCount';

export const Route = createFileRoute('/debtors/$debtorId')({
  component: DebtorInfo,
});

function DebtorInfo() {
  const { debtorId } = Route.useParams();
  const [isReturnDebtDialogShown, setIsReturnDebtDialogShown] = useState(false);
  const isOverdueMarkerShown = useSettingsStore((state) => state.showOverdueDebtors);

  const debtorHistory = useHistoryStore(
    useShallow((state) => selectDebtorHistory(state, debtorId)),
  );
  const debtor = useDebtorsStore(useShallow((state) => selectDebtorById(state, debtorId)));
  const overduesCount = useOverduesCount(debtorId);
  const hasOverdues = overduesCount > 0;

  const totalDebt = roundMoney(debtorHistory.reduce((acc, item) => acc + item.amount, 0));
  const initials = getInitials(getFullName(debtor.firstName, debtor.lastName));

  const handleDecreaseDebt = () => setIsReturnDebtDialogShown(true);

  return (
    <>
      <DropdownMenu>
        <main className="flex flex-col gap-4">
          <section className="flex flex-col gap-2 items-center relative">
            <Popover>
              <PopoverTrigger disabled={!hasOverdues || !isOverdueMarkerShown}>
                <Avatar className="size-15 relative">
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  {isOverdueMarkerShown && hasOverdues && (
                    <AvatarOverdue>{overduesCount}</AvatarOverdue>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent side="top" avoidCollisions sideOffset={-30}>
                <p>
                  Количество просрочек по долгам: <b>{overduesCount}</b>
                </p>
              </PopoverContent>
            </Popover>
            <h2 className="text-xl">{getFullName(debtor.firstName, debtor.lastName)}</h2>
            <DropdownMenuTrigger asChild>
              <p className="border py-2 px-8 rounded-xl shadow">
                Общий долг: <b>{totalDebt} BYN</b>
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1" avoidCollisions side="bottom" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="p-2 text-green-700 dark:text-green-400 justify-center"
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
