import { useDebtStore } from "@/stores/use-debt-store";
import { DeptHistoryItem } from "@components/dept-history-item";
import { NoDataPlaceholder } from "@components/no-data-placeholder";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/history")({
  component: History,
});

function History() {
  const historyItems = useDebtStore((state) => state.debtHistory);
  const hasItems = historyItems.length !== 0;

  return (
    <div className="flex flex-col gap-1">
      {hasItems ? (
        historyItems.map((item) => (
          <DeptHistoryItem key={item.id} item={item} />
        ))
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
