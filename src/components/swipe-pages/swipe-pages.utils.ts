import { navItems } from '@components/navigation';
import type { Neighbors, Side } from './swipe-pages.types';
import { SWIPE_DISTANCE_RATIO, SWIPE_VELOCITY } from './swipe-pages.constants';

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path);

export const getTabIndex = (pathname: string) =>
  navItems.findIndex((item) => item.to === normalize(pathname));

export const getNeighbors = (tabIndex: number): Neighbors => ({
  prev: navItems[tabIndex - 1],
  next: navItems[tabIndex + 1],
});

export const getSideByPosition = (position: number): Side | null => {
  if (position < 0) return 'next';
  if (position > 0) return 'prev';
  return null;
};

export const isSwipePassed = (offset: number, velocity: number, width: number) =>
  Math.abs(offset) > width * SWIPE_DISTANCE_RATIO || Math.abs(velocity) > SWIPE_VELOCITY;

export const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
};
