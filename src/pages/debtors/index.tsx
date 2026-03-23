import { selectDebtorsSummary, useDebtStore } from "@/stores/use-debt-store";
import { DebtorCard } from "@components/debtor-card";
import { NoDataPlaceholder } from "@components/no-data-placeholder";
import { createFileRoute } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute("/debtors/")({
  component: Debtors,
});

function Debtors() {
  const debtors = useDebtStore(useShallow(selectDebtorsSummary));

  return (
    <div className="flex flex-col gap-1">
      {Object.keys(debtors).length !== 0 ? (
        Object.entries(debtors).map(([name, amount]) => (
          <DebtorCard key={name} amount={amount} name={name} />
        ))
      ) : (
        <NoDataPlaceholder
          title="Список должников пуст"
          description="И это отличная новость"
          className="gap-2 pt-2"
        />
      )}
    </div>
  );
}
