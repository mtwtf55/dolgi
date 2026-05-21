import {
  getDebtorKeyByName,
  selectDebtorsSummary,
  useDebtStore,
} from "@/stores/use-debt-store";
import { DebtorCard } from "@components/debtor-card";
import { NoDataPlaceholder } from "@components/no-data-placeholder";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute("/debtors/")({
  component: Debtors,
});

function Debtors() {
  const debtors = useDebtStore(useShallow(selectDebtorsSummary));
  const navigate = useNavigate();

  const handleDebtorSelected = (debtorName: string) => () => {
    const debtorKey = getDebtorKeyByName(debtorName);

    if (!debtorKey) return;
    navigate({ to: "/debtors/$debtorId", params: { debtorId: debtorKey } });
  };

  return (
    <div className="flex flex-col gap-1">
      {Object.keys(debtors).length !== 0 ? (
        Object.entries(debtors).map(([name, amount]) => (
          <DebtorCard
            key={name}
            amount={amount}
            name={name}
            onClick={handleDebtorSelected(name)}
          />
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
