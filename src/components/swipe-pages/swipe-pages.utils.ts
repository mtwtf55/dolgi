import { navItems } from '@components/navigation';

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path);

export const getTabIndex = (pathname: string) =>
  navItems.findIndex((item) => item.to === normalize(pathname));
