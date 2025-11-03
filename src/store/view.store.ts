import { create } from 'zustand';

interface ViewStore {
  view: boolean;
  setView: (view: boolean) => void;
  toggleView: () => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  view: false,
  setView: (view) => set({ view }),
  toggleView: () => set((state) => ({ view: !state.view })),
}));
