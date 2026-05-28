import { Navigation } from '@components/navigation';
import { Toaster } from '@ui/sonner';
import type { LayoutProps } from './layout.types';

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navigation />
      <main className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8 flex-1 relative">
        {children}
        <Toaster position="top-right" richColors />
      </main>
    </div>
  );
}
