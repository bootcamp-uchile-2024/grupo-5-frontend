import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatalogoProductoDto } from "../interface/Productos/dto/CatalogoProductoDto";
import { GetProductoDto } from "../interface/Productos/dto/GetProductoDto";

export interface CartState {
  idUsuario: number;
  productos: (CatalogoProductoDto | GetProductoDto)[];
}

const loadCartFromLocalStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem("__redux__cart__");
    console.log("Cargando desde el localStorage:", savedCart);
    return savedCart ? JSON.parse(savedCart) : { idUsuario: 1, productos: [] };
  } catch (error) {
    console.error("Error al cargar el carrito desde el Local Storage:", error);
    return { idUsuario: 1, productos: [] };
  }
};

const saveCartToLocalStorage = (state: CartState) => {
  try {
    console.log("Guardando en localStorage:", state);
    const stateAsJson = JSON.stringify(state);
    localStorage.setItem("__redux__cart__", stateAsJson);
  } catch (error) {
    console.error("Error al guardar el carrito de compras", error);
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<CatalogoProductoDto | GetProductoDto>
    ) {
      const existingItem = state.productos.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.stockProducto += action.payload.stockProducto;
      } else {
        state.productos.push({ ...action.payload });
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.productos = state.productos.filter(
        (item) => item.id !== action.payload
      );
      saveCartToLocalStorage(state);
    },
    clearCart(state) {
      state.productos = [];
      saveCartToLocalStorage(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; cantidad: number }>
    ) => {
      const { id, cantidad } = action.payload;
      const item = state.productos.find((item) => item.id === id);
      if (item) {
        item.stockProducto += cantidad;
        if (item.stockProducto < 1) {
          item.stockProducto = 1;
        }
      }
      saveCartToLocalStorage(state);
    },
    clearCartAndLocalStorage(state) {
      state.productos = [];
      localStorage.removeItem("__redux__cart__");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  clearCartAndLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
