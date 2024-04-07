import { create } from 'zustand';
import { looksFromBackend } from '@/components/screens/home/home.fakeData';

type LookItem = {
  id: string;
  name: string;
  path: string;
  colors: string[];
  price: number;
};

type Look = {
  lookName: string;
  lookImg: string;
  items: LookItem[];
};

type RefreshLookStore = {
  looks: Look[];
  changeLook: () => void;
};

function changeLooks(array: Look[]) {
  const lastEl = array.pop() as Look;
  array.unshift(lastEl);
  return array;
}

export const useRefreshLookStore = create<RefreshLookStore>((set) => ({
  looks: looksFromBackend,
  changeLook: () => {
    set((state) => ({
      looks: [...changeLooks(state.looks)],
    }));
  },
}));
