import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GetProductoDto {
    id: number;
    nombreProducto: string;
    marca: string;
    descripcion: string;
    sku: string;
    precio: number;
    stock: number;
    peso: string;
    tamanio: string;
    ingredientes: string;
    imagenes: ImagenProducto[];
    material: string;
    categoria: string;
}

export interface ImagenProducto {
    idImagen: number;
    pathImagenProducto: string;
}

const initialState: GetProductoDto[] = [];

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<GetProductoDto[]>) => {
            return action.payload;
        },
        addProduct: (state, action: PayloadAction<GetProductoDto>) => {
            state.push(action.payload);
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            return state.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<GetProductoDto>) => {
            const updatedProduct = action.payload;
            const index = state.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state[index] = updatedProduct;
            }
        }
    }
});

export const { setProducts, addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;