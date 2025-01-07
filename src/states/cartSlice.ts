import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatalogoProductoDto } from "../interface/Productos/dto/CatalogoProductoDto";
import { GetProductoDto } from "../interface/Productos/dto/GetProductoDto";

export interface CartState {
  idUsuario: number;
  idCarroCompra: string | null;
  productos: (CatalogoProductoDto | GetProductoDto)[];
}

const loadCartFromLocalStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem("__redux__cart__");
    console.log("Cargando desde el localStorage:", savedCart);
    return savedCart
      ? JSON.parse(savedCart)
      : { idUsuario: 1, idCarroCompra: null, productos: [] };
  } catch (error) {
    console.error("Error al cargar el carrito desde el Local Storage:", error);
    return { idUsuario: 1, idCarroCompra: null, productos: [] };
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
    setUserId(state, action: PayloadAction<number>) {
      state.idUsuario = action.payload;
      saveCartToLocalStorage(state);
    },
    setCarroCompraId(state, action: PayloadAction<string>) {
      state.idCarroCompra = action.payload;
      saveCartToLocalStorage(state);
    },
    enviarPedido(state) {
      const pedido = {
        idPedido: Date.now(),
        idUsuario: state.idUsuario,
        detalles: state.productos.map((producto, index) => ({
          idpedido: Date.now(),
          iddetallepedido: index + 1,
          idProducto: producto.id,
          cantidad: producto.stockProducto,
          precio: producto.precioProducto,
        })),
      };

      fetch(
        `http://107.21.145.167:5001/pedidoUsarioRegistrado/${state.idCarroCompra}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(pedido),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Pedido enviado exitosamente:", data);
        })
        .catch((error) => {
          console.error("Error al enviar el pedido:", error);
        });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  clearCartAndLocalStorage,
  setUserId,
  setCarroCompraId,
  enviarPedido,
} = cartSlice.actions;
export default cartSlice.reducer;
