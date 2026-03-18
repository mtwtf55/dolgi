import { Navigation } from "../navigation";
import type { LayoutProps } from "./types";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navigation />
      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 flex-1">
        {children}
      </main>
    </div>
  );
}
