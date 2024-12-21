import { configureStore, Middleware } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice";
import userReducer from "./loggedUserSlice";
import productsSlice from "./ProductSlice";
import filtersReducer from "./filtersSlice";
import formReducer from "./formSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("__redux__form__");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState: Middleware = (store) => (next) => (action) => {
  next(action);

  const estado = store.getState();

  const estadoAsJson = JSON.stringify(estado.user);
  localStorage.setItem("__redux__user__", estadoAsJson);

  const productsAsJson = JSON.stringify(estado.products);
  localStorage.setItem("__redux__products__", productsAsJson);

  const formAsJson = JSON.stringify(estado.form);
  localStorage.setItem("__redux__form__", formAsJson);
};

const preloadedState = {
  form: loadState(),
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
    products: productsSlice,
    filters: filtersReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistedState),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
