import type { DebtStoreHistoryItem } from "@/stores/use-debt-store";

export type UpcomingReturnCardProps = {
  item: DebtStoreHistoryItem &
    Required<Pick<DebtStoreHistoryItem, "returnDate">>;
};
