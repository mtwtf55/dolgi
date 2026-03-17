import { create } from "zustand";

type State = {
  counter: number;
};

type Actions = {
  increment: VoidFunction;
  decrement: VoidFunction;
};

export const useCounter = create<State & Actions>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));
