import { configureStore, Middleware  } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice";
import loggedUser from "./loggedUserSlice";
import usersSlices from "./usersSlice";
import  productsSlice  from "./ProductSlice";
import filtersReducer from "./filtersSlice";

const persistedState: Middleware = store => next => action => {
  next(action);

  console.log(action)
  //en referencia al estado post cambio
  const estado = store.getState()

  const estadoAsJson = JSON.stringify(estado.users)
  localStorage.setItem('__redux__users__', estadoAsJson)

   // Guardar estado de products en localStorage
   const productsAsJson = JSON.stringify(estado.products);
   localStorage.setItem('__redux__products__', productsAsJson);

}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    loggedUser: loggedUser,
    users: usersSlices,
    products: productsSlice,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedState),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;