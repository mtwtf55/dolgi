import { DateFormatters } from '@/constants/date';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorById } from '@/stores/use-debtors-store/use-debtors-store.selectors';
import { createHistoryItem, selectItemById, useHistoryStore } from '@/stores/use-history-store';
import { deleteReturnItem } from '@/stores/use-return-store/use-return-store';
import { getFullName, getInitials } from '@/utils';
import { ConfirmModal } from '@components/confirm-modal';
import { Avatar, AvatarFallback } from '@ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@ui/item';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';
import type { UpcomingReturnCardProps } from './upcoming-return-card.types';
import { getStatusStyles } from './upcoming-return-card.utils';

export const UpcomingReturnCard = ({ itemId, returnDate }: UpcomingReturnCardProps) => {
  const { Modal: ConfirmReturnModal, confirm: confirmReturn } = useConfirmModal(ConfirmModal);

  const historyItem = useHistoryStore(useShallow((state) => selectItemById(state, itemId)));
  const actor = useDebtorsStore(
    useShallow((state) => selectDebtorById(state, historyItem.actorId)),
  );

  const initials = getInitials(getFullName(actor.firstName, actor.lastName));
  const formattedDate = format(returnDate, DateFormatters.DATE_MONTH_HUMAN, {
    locale: ru,
  });

  const handleReturnDebt = async () => {
    const result = await confirmReturn();

    if (!result) return;

    createHistoryItem({ actorId: actor.id, amount: -historyItem.amount, date: new Date() });
    deleteReturnItem(historyItem.id);
    toast.success('Долг успешно возвращен');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Item variant="outline" className={getStatusStyles(returnDate)}>
            <ItemMedia>
              <Avatar size="lg">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <b>{getFullName(actor.firstName, actor.lastName)}</b>
              </ItemTitle>
              <ItemDescription>{historyItem.amount} BYN</ItemDescription>
            </ItemContent>
            <ItemActions>{formattedDate}</ItemActions>
          </Item>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 p-1" avoidCollisions side="bottom" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-2 text-green-700 " onClick={handleReturnDebt}>
              <BadgeCheck />
              Возвращено
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmReturnModal title="Вы уверены, что хотите закрыть этот долг?" />
    </>
  );
};
