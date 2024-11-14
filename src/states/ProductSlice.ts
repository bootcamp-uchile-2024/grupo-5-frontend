import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE: ProductsWithId[] = []

export interface Products {
    name: string;
}

export type productId = string;

export interface ProductsWithId extends Products {
    id: productId;
}


const initialState: ProductsWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__users__");
    return persistedState ? JSON.parse(persistedState) as ProductsWithId[] : DEFAULT_STATE;

})();

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<Products>) => {
            console.log(current(state))
            const id = crypto.randomUUID();
            state.push({ id, ...action.payload })

        },
        deleteProducts: (state, action: PayloadAction<productId>) => {
            return state.filter(product => product.id !== action.payload)
        },
        updateProducts: (state, action: PayloadAction<ProductsWithId>) => {
            const userModified = action.payload;
            const index = state.findIndex(usuario => usuario.id === userModified.id);
            state[index] = userModified;
        }
    }
})

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;