import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debtors/$debtorId")({
  component: DebtorInfo,
});

function DebtorInfo() {
  const { debtorId } = Route.useParams();

  return <div>Hello {debtorId}</div>;
}
