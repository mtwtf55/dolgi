import { CreateDebtForm } from "@components/create-debt-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <CreateDebtForm />
    </div>
  );
}
