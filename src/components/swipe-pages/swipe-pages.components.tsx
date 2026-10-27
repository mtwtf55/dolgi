import { useRouter } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { Suspense } from 'react';
import { useSwipePage } from './hooks/use-swipe-page';
import { ELASTIC_WITHOUT_NEIGHBOR, ELASTIC_WITH_NEIGHBOR } from './swipe-pages.constants';
import type { NeighborPageProps, RoutesByPath, SwipePageProps } from './swipe-pages.types';

export const NeighborPage = ({ to, side }: NeighborPageProps) => {
  const router = useRouter();
  const Page = (router.routesByPath as unknown as RoutesByPath)[to]?.options.component;

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

export const SwipePage = ({ children, tabIndex, handoff, onHandoffChange }: SwipePageProps) => {
  const { x, dragControls, neighbors, peekSide, handlers } = useSwipePage(
    tabIndex,
    handoff,
    onHandoffChange,
  );
  const peekedNeighbor = peekSide && neighbors[peekSide];

  return (
    <motion.div
      className="flex-1 relative"
      style={{ x, touchAction: 'pan-y' }}
      drag="x"
      dragControls={dragControls}
      dragListener={false}
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{
        left: neighbors.next ? ELASTIC_WITH_NEIGHBOR : ELASTIC_WITHOUT_NEIGHBOR,
        right: neighbors.prev ? ELASTIC_WITH_NEIGHBOR : ELASTIC_WITHOUT_NEIGHBOR,
      }}
      {...handlers}
    >
      {children}
      {peekSide && peekedNeighbor && <NeighborPage to={peekedNeighbor.to} side={peekSide} />}
    </motion.div>
  );
};
