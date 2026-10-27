import type { NavigationItem } from '@components/navigation';
import type { ComponentType, PropsWithChildren } from 'react';

export type Side = 'prev' | 'next';

export type SwipePagesProps = PropsWithChildren<object>;

export type SwipePageProps = PropsWithChildren<{
  tabIndex: number;
  handoff: SwipeHandoff;
  onHandoffChange: (handoff: SwipeHandoff) => void;
}>;

export type NeighborPageProps = { to: string; side: Side };

export type Neighbors = Record<Side, NavigationItem | undefined>;

export type SwipeHandoff = { from: number; leavingSide: Side | null };

export type RoutesByPath = Record<string, { options: { component?: ComponentType } }>;
