import { DateFormatters } from "@/constants/date";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { getInitials } from "@/utils";
import { ConfirmModal } from "@components/confirm-modal";
import { Avatar, AvatarFallback } from "@ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@ui/item";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { BadgeCheck } from "lucide-react";
import type { UpcomingReturnCardProps } from "./upcoming-return-card.types";
import { getStatusStyles } from "./upcoming-return-card.utils";

export const UpcomingReturnCard = ({ item }: UpcomingReturnCardProps) => {
  const {
    to: { name },
    returnDate,
    amount,
    id,
  } = item;

  const { Modal: ConfirmReturnModal, confirm: confirmReturn } =
    useConfirmModal(ConfirmModal);

  const initials = getInitials(name);
  const formattedDate = format(returnDate, DateFormatters.DATE_MONTH_HUMAN, {
    locale: ru,
  });

  const handleReturnDebt = async () => {
    const result = await confirmReturn();

    if (!result) return;



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
                <b>{name}</b>
              </ItemTitle>
              <ItemDescription>{amount} BYN</ItemDescription>
            </ItemContent>
            <ItemActions>{formattedDate}</ItemActions>
          </Item>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 p-1"
          avoidCollisions
          side="bottom"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="p-2 text-green-700 "
              onClick={handleReturnDebt}
            >
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
