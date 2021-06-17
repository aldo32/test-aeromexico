import { createSlice } from '@reduxjs/toolkit';

export const characterSlice = createSlice({
  name: 'character',
  initialState: {
    favorites: [],
    characters: [],
    charactersFilter: [],
  },
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setCharactersFilter: (state, action) => {
      state.charactersFilter = action.payload;
    },
    addFavorite: (state, action) => {
      let find = state.favorites.find(item => item.name === action.payload.name);
      if (find === undefined) {
        let favorites = state.favorites;
        favorites.push(action.payload);
        state.favorites = favorites;
      }
    },
    removeFavorite: (state, action) => {
      let favorites = state.favorites.filter(item => item.name !== action.payload)
      state.favorites = favorites;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  }
});

export const {setCharacters, setCharactersFilter, addFavorite, removeFavorite, setFavorites} = characterSlice.actions
export default characterSlice.reducer