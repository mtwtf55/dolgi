import { DateFormatters } from "@/constants/date";
import { getInitials } from "@/utils";
import { Avatar, AvatarFallback } from "@ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@ui/item";
import { format } from "date-fns";
import type { DeptHistoryItemProps } from "./dept-history-item.types";
import { formatDate } from "./dept-history-item.utils";

export const DeptHistoryItem = ({ item }: DeptHistoryItemProps) => {
  const { amount, debtDate, to, returnDate, createdAt } = item;

  const debtDateFormatted = formatDate(debtDate);
  const returnDateFormatted = returnDate ? formatDate(returnDate) : null;
  const initials = getInitials(to);
  const createdAtFormatted = format(
    new Date(createdAt),
    DateFormatters.DATE_MONTH,
  );

  return (
    <Item variant={"outline"} className="relative">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <b>{to}</b> {"->"} {amount} BYN
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
      <small className="absolute top-1.5 right-2 opacity-40">
        {createdAtFormatted}
      </small>
    </Item>
  );
};
