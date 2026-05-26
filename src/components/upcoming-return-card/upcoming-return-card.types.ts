import type { HistoryItem } from '@/stores/use-history-store';
import type { ReturnItem } from '@/stores/use-return-store/use-return-store.types';

export type UpcomingReturnCardProps = {
  itemId: HistoryItem['id'];
  returnDate: ReturnItem['returnDate'];
};
