import { create } from 'zustand';

type FavoriteStore = {
  favorites: number[];
  addFavorite: (id: number) => void;
  delFavorite: (id: number) => void;
  toggleFavorite:(id:number) => void
};


export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  addFavorite: (id) => {
    set((state) => ({ favorites: [...state.favorites, id] }));
  },
  delFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((el) => el !== id),
    }));
  },
  toggleFavorite:(id) => set(({favorites}) => {
    if(favorites.includes(id)) {
      return {
        favorites: favorites.filter(el => el !== id)
      }
    } 

    return {favorites: [...favorites, id]}
  })
}));
