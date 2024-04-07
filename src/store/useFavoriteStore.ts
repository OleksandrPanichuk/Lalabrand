import { create } from 'zustand';

type FavoriteStore = {
  favorites: string[];
  addFavorite: (id: string) => void;
  delFavorite: (id: string) => void;
  toggleFavorite:(id:string) => void
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
