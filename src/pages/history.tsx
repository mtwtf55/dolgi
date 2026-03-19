import { useDebtStore } from "@/stores/use-debt-store";
import { DeptHistoryItem } from "@components/dept-history-item";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/history")({
  component: History,
});

function History() {
  const historyItems = useDebtStore((state) => state.debtHistory);

  return (
    <div className="flex flex-col gap-1">
      {historyItems.map((item) => (
        <DeptHistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}
