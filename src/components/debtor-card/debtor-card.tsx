import { useSettingsStore } from '@/stores/use-settings-store';
import { getInitials } from '@/utils';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@ui/item';
import type { DebtorCardProps } from './debtor-card.types';

export const DebtorCard = (props: DebtorCardProps) => {
  const { amount, name, onClick, hasOverdues } = props;
  const initials = getInitials(name);
  const isOverdueMarkerShown = useSettingsStore((state) => state.showOverdueDebtors);

  return (
    <Item variant="outline" onClick={onClick} className="relative overflow-hidden">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <b>{name}</b> должен
        </ItemTitle>
      </ItemContent>
      <ItemActions>{amount} BYN</ItemActions>
      {isOverdueMarkerShown && hasOverdues && (
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-300" />
      )}
    </Item>
  );
};
