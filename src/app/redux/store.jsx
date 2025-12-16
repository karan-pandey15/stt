import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouriteReducer from "./favouriteSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
    order: orderReducer,
  },
});
