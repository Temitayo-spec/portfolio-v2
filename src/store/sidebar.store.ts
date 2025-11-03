import { create } from 'zustand';

interface SidebarStore {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebar: false,
  setSidebar: (sidebar) => set({ sidebar }),
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
}));
