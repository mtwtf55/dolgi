import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@ui/item";
import type { UpcomingReturnCardProps } from "./upcoming-return-card.types";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { getInitials } from "@/utils";
import { format } from "date-fns";
import { DateFormatters } from "@/constants/date";
import { ru } from "date-fns/locale";
import { getStatusStyles } from "./upcoming-return-card.utils";

export const UpcomingReturnCard = ({ item }: UpcomingReturnCardProps) => {
  const { to, returnDate, amount } = item;

  const initials = getInitials(to);
  const formattedDate = format(returnDate, DateFormatters.DATE_MONTH_HUMAN, {
    locale: ru,
  });

  return (
    <Item variant="outline" className={getStatusStyles(returnDate)}>
      <ItemMedia>
        <Avatar size="lg">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <b>{to}</b>
        </ItemTitle>
        <ItemDescription>{amount} BYN</ItemDescription>
      </ItemContent>
      <ItemActions>{formattedDate}</ItemActions>
    </Item>
  );
};
