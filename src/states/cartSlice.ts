import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogoProductoDto } from '../interface/Productos/read-catalogo-productos.dto';
export interface CartState {
  idUsuario: number;
  productos: CatalogoProductoDto[];
}
const loadCartFromLocalStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('__redux__cart__');
    console.log('Cargando desde el localStorage:', savedCart);
    return savedCart ? JSON.parse(savedCart) : { idUsuario: 1, productos: [] };
  } catch (error) {
    console.error('Error al cargar el carrito desde el Local Storage:', error);
    return { idUsuario: 1, productos: [] };
  }
};
const saveCartToLocalStorage = (state: CartState) => {
  try {
    console.log('Guardando en localStorage:', state);
    const stateAsJson = JSON.stringify(state);
    localStorage.setItem('__redux__cart__', stateAsJson);
  } catch (error) {
    console.error('Error al guardar el carrito de compras', error);
  }
};
const initialState: CartState = loadCartFromLocalStorage();
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CatalogoProductoDto>) {
      const existingItem = state.productos.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.stock += action.payload.stock;
      } else {
        state.productos.push({ ...action.payload });
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.productos = state.productos.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state);
    },
    clearCart(state) {
      state.productos = [];
      saveCartToLocalStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; cantidad: number }>) => {
      const { id, cantidad } = action.payload;
      const item = state.productos.find(item => item.id === id);
      if (item) {
        item.stock += cantidad;
        if (item.stock < 1) {
          item.stock = 1;
        }
      }
      saveCartToLocalStorage(state);
    },
  },
});
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;