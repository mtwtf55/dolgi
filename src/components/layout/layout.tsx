import { useApplyTheme } from '@/hooks/useApplyTheme';
import { AccessControl } from '@components/access-control';
import { Navigation } from '@components/navigation';
import { SwipePages } from '@components/swipe-pages';
import { Toaster } from '@ui/sonner';
import type { LayoutProps } from './layout.types';

export function Layout({ children }: LayoutProps) {
  useApplyTheme();

  return (
    <div className="min-h-dvh flex flex-col relative overflow-x-clip">
      <Navigation />
      <main className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8 flex-1 relative flex flex-col">
        <SwipePages>{children}</SwipePages>
      </main>
      <AccessControl />
      <Toaster position="top-right" richColors />
    </div>
  );
}
