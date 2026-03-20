import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@ui/item";
import type { DebtorCardProps } from "./debtor-card.types";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { getInitials } from "@/utils";

export const DebtorCard = ({ amount, name }: DebtorCardProps) => {
  const initials = getInitials(name);

  return (
    <Item variant="outline">
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
    </Item>
  );
};
