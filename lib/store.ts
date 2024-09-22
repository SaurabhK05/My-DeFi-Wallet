import { configureStore } from "@reduxjs/toolkit";
import wallerReducer from "./features/walletSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { wallet: wallerReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
