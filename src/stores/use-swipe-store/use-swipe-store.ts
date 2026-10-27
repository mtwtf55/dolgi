import { create } from 'zustand';
import type { UseSwipeStoreState } from './use-swipe-store.types';

export const useSwipeStore = create<UseSwipeStoreState>()(() => ({
  pendingTab: null,
}));

export const setPendingTab = (to: string | null) => {
  useSwipeStore.setState({ pendingTab: to });
};
