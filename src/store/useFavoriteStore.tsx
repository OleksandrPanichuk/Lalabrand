import { create } from 'zustand';

type FavoriteStore = {
  favorites: number[];
  addFavorite: (id: number) => void;
  delFavorite: (id: number) => void;
};


export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  addFavorite: (id: number) => {
    set((state) => ({ favorites: [...state.favorites, id] }));
  },
  delFavorite: (id: number) => {
    set((state) => ({
      favorites: state.favorites.filter((el) => el !== id),
    }));
  },
}));
