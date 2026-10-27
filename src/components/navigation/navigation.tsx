import { cn } from '@/lib/utils';
import { setPendingTab, useSwipeStore } from '@/stores/use-swipe-store';
import { Link, useMatchRoute } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@ui/navigation-menu';
import { useEffect } from 'react';
import { navItems } from './navigation.constants';

export function Navigation() {
  const matchRoute = useMatchRoute();
  const pendingTab = useSwipeStore((state) => state.pendingTab);
  const isRouteActive = (to: string) => !!matchRoute({ to, fuzzy: to !== '/' });
  const isPendingTabReached = !!pendingTab && isRouteActive(pendingTab);

  useEffect(() => {
    if (isPendingTabReached) setPendingTab(null);
  }, [isPendingTabReached]);

  return (
    <header className="sticky top-0 z-50 left-0 right-0 flex bg-background/95 backdrop-blur justify-center pt-4 ">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map(({ label, to }) => {
            const isActive = pendingTab ? to === pendingTab : isRouteActive(to);

            return (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link
                    to={to}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn('text-base!', isActive && '!text-primary !font-bold !bg-muted')}
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
