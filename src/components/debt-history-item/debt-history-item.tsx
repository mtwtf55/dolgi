import { DateFormatters } from '@/constants/date';
import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorById } from '@/stores/use-debtors-store/use-debtors-store.selectors';
import { selectItemById, useHistoryStore } from '@/stores/use-history-store';
import { useReturnStore } from '@/stores/use-return-store/use-return-store';
import { selectReturnDate } from '@/stores/use-return-store/use-return-store.selectors';
import { getFullName, getInitials } from '@/utils';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@ui/item';
import { format } from 'date-fns';
import { useShallow } from 'zustand/shallow';
import type { DebtHistoryItemProps } from './debt-history-item.types';
import { formatDate } from './debt-history-item.utils';

export const DebtHistoryItem = ({ itemId }: DebtHistoryItemProps) => {
  const historyItem = useHistoryStore(useShallow((state) => selectItemById(state, itemId)));
  const actor = useDebtorsStore(
    useShallow((state) => selectDebtorById(state, historyItem.actorId)),
  );

  const returnDate = useReturnStore((state) => selectReturnDate(state, historyItem.id));

  const debtDateFormatted = formatDate(historyItem.date);
  const returnDateFormatted = returnDate ? formatDate(returnDate) : null;
  const initials = getInitials(getFullName(actor.firstName, actor.lastName));
  const createdAtFormatted = format(new Date(historyItem.createdAt), DateFormatters.DATE_MONTH);

  return (
    <Item variant={'outline'} className="relative">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <b>{getFullName(actor.firstName, actor.lastName)}</b> {'->'} {historyItem.amount} BYN
        </ItemTitle>
        <ItemDescription>
          <div>
            Занял <b>{debtDateFormatted}</b>.
          </div>
          {returnDateFormatted && (
            <div>
              Должен вернуть <b>{returnDateFormatted}</b>
            </div>
          )}
        </ItemDescription>
      </ItemContent>
      <small className="absolute top-1.5 right-2 opacity-40">{createdAtFormatted}</small>
    </Item>
  );
};
