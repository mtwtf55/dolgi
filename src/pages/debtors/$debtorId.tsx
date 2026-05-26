import {
    selectDebtorHistory,
    selectDebtorNameByKey,
    useHistoryStore,
} from "@/stores/use-history-store";
import { getInitials } from "@/utils";
import { DeptHistoryItem } from "@components/dept-history-item";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Separator } from "@ui/separator";
import { useShallow } from "zustand/shallow";

export const Route = createFileRoute("/debtors/$debtorId")({
  component: DebtorInfo,
});

function DebtorInfo() {
  const { debtorId } = Route.useParams();

  const debtorHistory = useHistoryStore(
    useShallow((state) => selectDebtorHistory(state, debtorId)),
  );
  const debtorName = useHistoryStore((state) =>
    selectDebtorNameByKey(state, debtorId),
  );

  if (!debtorName) {
    throw new Error("Debtor name cannot be null");
  }

  const totalDebt = debtorHistory.reduce((acc, item) => acc + item.amount, 0);
  const initials = getInitials(debtorName);

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 items-center">
        <Avatar className="size-15">
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl">{debtorName}</h2>
        <p className="border py-2 px-8 rounded-xl shadow">
          Общий долг: <b>{totalDebt} BYN</b>
        </p>
      </section>
      <Separator />
      <section className="flex flex-col gap-2">
        {debtorHistory.map((item) => (
          <DeptHistoryItem key={item.id} item={item} />
        ))}
      </section>
    </main>
  );
}
