// src/redux/favouriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // stores favorite product objects or IDs
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (!existing) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    toggleFavourite: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearFavourites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavourite, removeFavourite, toggleFavourite, clearFavourites } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
