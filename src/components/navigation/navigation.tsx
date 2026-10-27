import { Link } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@ui/navigation-menu';
import { navItems } from './navigation.constants';

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 left-0 right-0 flex bg-background/95 backdrop-blur justify-center pt-4 ">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map(({ label, to }) => (
            <NavigationMenuItem key={to}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link
                  to={to}
                  activeProps={{
                    className: '!text-primary !font-bold !bg-muted',
                  }}
                  className="text-base!"
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
