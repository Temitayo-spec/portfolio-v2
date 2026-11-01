import { create } from 'zustand';

interface IntroStore {
  done: boolean;
  setDone: (done: boolean) => void;
}

// Flips once the preloader starts leaving, so page intros can play underneath it.
export const useIntroStore = create<IntroStore>((set) => ({
  done: false,
  setDone: (done) => set({ done }),
}));
