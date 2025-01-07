import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioDto } from "../interface/Usuarios/dto/UsuarioDto";

interface UserState {
  user: UsuarioDto | null;
  idCarroCompra: string | null;
}

const initialState: UserState = {
  user: null,
  idCarroCompra: null,
};

const userCarroSlice = createSlice({
  name: "userCarro",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UsuarioDto>) => {
      state.user = action.payload;
    },
    saveCarroCompra: (state, action: PayloadAction<string>) => {
      state.idCarroCompra = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.idCarroCompra = null;
    },
  },
});

export const { save, saveCarroCompra, logout } = userCarroSlice.actions;
export default userCarroSlice.reducer;
