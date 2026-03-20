import { selectUpcomingReturns, useDebtStore } from "@/stores/use-debt-store";
import { CreateDebtForm } from "@components/create-debt-form";
import { UpcomingReturnCard } from "@components/upcoming-return-card";
import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@ui/separator";
import { useShallow } from "zustand/shallow";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const upcomingReturns = useDebtStore(useShallow(selectUpcomingReturns));

  return (
    <div className="flex flex-col gap-4">
      <CreateDebtForm />
      <section>
        <h3 className="font-medium">Ближайшие возвраты</h3>
        <Separator />
        <div className="pt-3 flex flex-col gap-1">
          {upcomingReturns.map((item) => (
            <UpcomingReturnCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
