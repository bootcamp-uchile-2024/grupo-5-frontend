import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  fromModalCarrito: boolean;
}

const initialState: NavigationState = {
  fromModalCarrito: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setFromModalCarrito: (state, action: PayloadAction<boolean>) => {
      state.fromModalCarrito = action.payload;
    },
  },
});

export const { setFromModalCarrito } = navigationSlice.actions;
export default navigationSlice.reducer;