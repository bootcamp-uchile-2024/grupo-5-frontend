import { configureStore, Middleware  } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice";
import loggedUser from "./loggedUserSlice";
import usersSlices from "./usersSlice";
import  productsSlice  from "./ProductSlice";

const persistedState: Middleware = store => next => action => {

  //en refencia al estado pre cambio


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
    products: productsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedState),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;