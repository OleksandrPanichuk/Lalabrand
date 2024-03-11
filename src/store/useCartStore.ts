import { TypeCartItem } from '@/shared/types';
import { create } from 'zustand';

interface ICartStore {
  items: TypeCartItem[];
  incrementCount: (
    input: { id: number; size: string; color: string } | number,
  ) => void;
  decrementCount: (id: number) => void;

  updateColor: (id: number, color: string) => void;
  updateSize: (id: number, size: string) => void;
  remove: (id: number) => void;
  add: (item: TypeCartItem) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  items: [],
  incrementCount: (input) => {
    set(({ items }) => {
      const condition = (item: TypeCartItem) => {
        if (typeof input === 'number') {
          return item.id === input;
        }

        const { color, id, size } = input;

        return item.itemId === id && item.color === color && item.size === size;
      };

      const item = items.find(condition);
      if (!item) return { items };

      item.count += 1;

      const newItems = items.map((value) => (condition(value) ? item : value));

      return { items: newItems };
    });
  },
  decrementCount: (id) => {
    set(({ items }) => {
      const item = items.find((val) => val.id === id);
      if (!item) return { items };

      if (item.count > 1) item.count -= 1;
      const newItems = items.map((value) => (value.id === id ? item : value));

      return { items: newItems };
    });
  },
  updateColor: (id, color) =>
    set(({ items }) => {
      const item = items.find((item) => item.id === id);

      if (!item) return { items };

      item.color = color;

      const sameItem = items.find(el => el.itemId === item.itemId && el.color === item.color && el.size === item.size && el.id !== item.id)


      if(sameItem) {
        sameItem.count += item.count
        return {items: items.filter(el => el.id !== id)}
      }

      const newItems = items.map((value) => (value.id === id ? item : value));
      return { items: newItems };
    }),
  updateSize: (id, size) =>
    set(({ items }) => {
      const item = items.find((item) => item.id === id);
      if (!item) return { items };
      item.size = size;

      const sameItem = items.find(el => el.itemId === item.itemId && el.color === item.color && el.size === item.size && el.id !== item.id)

      
      if(sameItem) {
        sameItem.count += item.count
        return {items: items.filter(el => el.id !== id)}
      }

      const newItems = items.map((value) => (value.id === id ? item : value));
      return { items: newItems };
    }),
  remove: (id) =>
    set(({ items }) => ({ items: items.filter((item) => item.id !== id) })),
  add: (item) => set(({ items }) => ({ items: [...items, item] })),
}));
