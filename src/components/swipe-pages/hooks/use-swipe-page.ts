import { setPendingTab } from '@/stores/use-swipe-store';
import { useNavigate, useRouter } from '@tanstack/react-router';
import {
  animate,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from 'motion/react';
import { useEffect, useState, type PointerEvent } from 'react';
import {
  EMPTY_SWIPE_HANDOFF,
  IGNORE_SWIPE_SELECTOR,
  SWIPE_SPRING,
} from '../swipe-pages.constants';
import type { Side, SwipeHandoff } from '../swipe-pages.types';
import {
  blurActiveElement,
  getNeighbors,
  getSideByPosition,
  isSwipePassed,
} from '../swipe-pages.utils';

export const useSwipePage = (
  tabIndex: number,
  handoff: SwipeHandoff,
  onHandoffChange: (handoff: SwipeHandoff) => void,
) => {
  const navigate = useNavigate();
  const router = useRouter();
  const controls = useDragControls();
  const reduceMotion = useReducedMotion();
  const [entering] = useState(handoff);
  const x = useMotionValue(entering.from);
  const [peekSide, setPeekSide] = useState<Side | null>(entering.leavingSide);
  const neighbors = getNeighbors(tabIndex);

  useEffect(() => {
    onHandoffChange(EMPTY_SWIPE_HANDOFF);

    if (entering.from === 0) return;

    const enterAnimation = animate(x, 0, SWIPE_SPRING);
    enterAnimation.then(() => setPeekSide((current) => (x.get() === 0 ? null : current)));

    return () => enterAnimation.stop();
  }, [entering, onHandoffChange, x]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(IGNORE_SWIPE_SELECTOR)) return;
    Object.values(neighbors).forEach((item) => item && router.preloadRoute({ to: item.to }));
    controls.start(event);
  };

  const handleDrag = () => {
    const side = getSideByPosition(x.get());
    setPeekSide((current) => (current === side ? current : side));
  };

  const handleDragEnd = async (_: unknown, { offset, velocity }: PanInfo) => {
    const width = window.innerWidth;
    const direction = offset.x < 0 ? -1 : 1;
    const target = direction === -1 ? neighbors.next : neighbors.prev;

    if (!isSwipePassed(offset.x, velocity.x, width) || !target) {
      await animate(x, 0, SWIPE_SPRING);
      setPeekSide(null);
      return;
    }

    setPendingTab(target.to);

    if (!reduceMotion) {
      onHandoffChange({
        from: x.get() - direction * width,
        leavingSide: direction === -1 ? 'prev' : 'next',
      });
    }

    navigate({ to: target.to });
  };

  return {
    x,
    neighbors,
    peekSide,
    handlers: {
      onPointerDown: handlePointerDown,
      onDragStart: blurActiveElement,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
    dragControls: controls,
  };
};
