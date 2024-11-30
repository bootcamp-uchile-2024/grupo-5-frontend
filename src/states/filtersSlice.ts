import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  marca: string[];
  tipo: string[];
  edad: string[];
  ordenar: string;
}

const initialState: FiltersState = {
  marca: [],
  tipo: [],
  edad: [],
  ordenar: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setMarcaFilter(state, action: PayloadAction<string[]>) {
      state.marca = action.payload;
    },
    setTipoFilter(state, action: PayloadAction<string[]>) {
      state.tipo = action.payload;
    },
    setEdadFilter(state, action: PayloadAction<string[]>) {
      state.edad = action.payload;
    },
    setOrdenarFilter(state, action: PayloadAction<string>) {
      state.ordenar = action.payload;
    },
    clearFilters(state) {
      state.marca = [];
      state.tipo = [];
      state.edad = [];
      state.ordenar = "";
    },
  },
});

export const {
  setMarcaFilter,
  setTipoFilter,
  setEdadFilter,
  setOrdenarFilter,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;