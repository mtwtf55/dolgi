import { CreateDeptForm } from "@components/create-dept-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <CreateDeptForm />
    </div>
  );
}
