import { useHistoryStore } from '@/stores/use-history-store';
import { DebtHistoryItem } from '@components/debt-history-item';
import { NoDataPlaceholder } from '@components/no-data-placeholder';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/history')({
  component: History,
});

function History() {
  const historyItems = useHistoryStore((state) => state.history);
  const hasItems = historyItems.length !== 0;

  return (
    <div className="flex flex-col gap-1">
      {hasItems ? (
        historyItems.map((item) => <DebtHistoryItem key={item.id} itemId={item.id} />)
      ) : (
        <NoDataPlaceholder
          title="Тут пока пусто"
          description="Здесь будут отображаться все ваши транзакции по займам и возвратам"
          className="pt-2 gap-2"
        />
      )}
    </div>
  );
}
