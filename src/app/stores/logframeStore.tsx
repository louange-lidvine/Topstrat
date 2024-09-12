import { create } from 'zustand';

type LogframeStore = {
  logframeData: any;
  setLogframeData: (data: any) => void;
  updateCell: (path: string, value: string) => void;
};

export const useLogframeStore = create<LogframeStore>((set) => ({
  logframeData: {},
  setLogframeData: (data) => set({ logframeData: data }),
  updateCell: (path: string, value: string) => {
    set((state) => {
      const newLogframeData = { ...state.logframeData };
      const keys = path.split('.');
      let cell = newLogframeData;

      keys.slice(0, -1).forEach((key) => {
        cell = cell[key];
      });
      cell[keys[keys.length - 1]] = value;

      return { logframeData: newLogframeData };
    });
  }
}));
