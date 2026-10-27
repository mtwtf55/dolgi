import { setPendingTab } from '@/stores/use-swipe-store';
import { navItems } from '@components/navigation';
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router';
import { animate, motion, useDragControls, useMotionValue, useReducedMotion } from 'motion/react';
import { Suspense, useState, type ComponentType, type PointerEvent } from 'react';
import {
  ELASTIC_WITHOUT_NEIGHBOR,
  ELASTIC_WITH_NEIGHBOR,
  IGNORE_SWIPE_SELECTOR,
  SWIPE_DISTANCE_RATIO,
  SWIPE_SPRING,
  SWIPE_VELOCITY,
} from './swipe-pages.constants';
import type { Side, SwipePagesProps } from './swipe-pages.types';
import { getTabIndex } from './swipe-pages.utils';

export const SwipePages = ({ children }: SwipePagesProps) => {
  const { pathname } = useLocation();
  const tabIndex = getTabIndex(pathname);

  if (tabIndex === -1) return <div className="flex-1">{children}</div>;

  return (
    <SwipePage key={pathname} tabIndex={tabIndex}>
      {children}
    </SwipePage>
  );
};

const SwipePage = ({ children, tabIndex }: SwipePagesProps & { tabIndex: number }) => {
  const navigate = useNavigate();
  const router = useRouter();
  const controls = useDragControls();
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const [peekSide, setPeekSide] = useState<Side | null>(null);

  const neighbors = { prev: navItems[tabIndex - 1], next: navItems[tabIndex + 1] };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(IGNORE_SWIPE_SELECTOR)) return;
    Object.values(neighbors).forEach((item) => item && router.preloadRoute({ to: item.to }));
    controls.start(event);
  };

  const handleDragStart = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  const handleDrag = (_: unknown, { offset }: { offset: { x: number } }) => {
    const side: Side | null = offset.x < 0 ? 'next' : offset.x > 0 ? 'prev' : null;
    setPeekSide((current) => (current === side ? current : side));
  };

  const handleDragEnd = async (
    _: unknown,
    { offset, velocity }: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const width = window.innerWidth;
    const passed =
      Math.abs(offset.x) > width * SWIPE_DISTANCE_RATIO || Math.abs(velocity.x) > SWIPE_VELOCITY;
    const direction = offset.x < 0 ? -1 : 1;
    const target = direction === -1 ? neighbors.next : neighbors.prev;

    if (!passed || !target) {
      await animate(x, 0, SWIPE_SPRING);
      setPeekSide(null);
      return;
    }

    setPendingTab(target.to);

    if (!reduceMotion) await animate(x, direction * width, SWIPE_SPRING);

    navigate({ to: target.to });
  };

  return (
    <motion.div
      className="flex-1 relative"
      style={{ x, touchAction: 'pan-y' }}
      drag="x"
      dragControls={controls}
      dragListener={false}
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{
        left: neighbors.next ? ELASTIC_WITH_NEIGHBOR : ELASTIC_WITHOUT_NEIGHBOR,
        right: neighbors.prev ? ELASTIC_WITH_NEIGHBOR : ELASTIC_WITHOUT_NEIGHBOR,
      }}
      onPointerDown={handlePointerDown}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {children}
      {peekSide && neighbors[peekSide] && (
        <NeighborPage to={neighbors[peekSide].to} side={peekSide} />
      )}
    </motion.div>
  );
};

const NeighborPage = ({ to, side }: { to: string; side: Side }) => {
  const router = useRouter();
  const route = (router.routesByPath as unknown as Record<string, { options: { component?: unknown } }>)[to];
  const Page = route?.options.component as ComponentType | undefined;

  if (!Page) return null;

  return (
    <div
      aria-hidden
      inert
      className="absolute inset-y-0 w-full overflow-hidden pointer-events-none"
      style={{ left: side === 'next' ? window.innerWidth : -window.innerWidth }}
    >
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </div>
  );
};
