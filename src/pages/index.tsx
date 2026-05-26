import { CreateDebtForm } from "@components/create-debt-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CreateDebtForm />
      {/* <section>
        {upcomingReturns.length !== 0 ? (
          <>
            <h3 className="font-medium">Ближайшие возвраты</h3>
            <Separator />
            <div className="pt-3 flex flex-col gap-1">
              {upcomingReturns.map((item) => (
                <UpcomingReturnCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <NoDataPlaceholder
            noIcon
            title="Ближайших возвратов пока нет"
            description="Чтобы отслеживать сроки, укажите дату возврата при создании долга."
          />
        )}
      </section> */}
    </div>
  );
}
