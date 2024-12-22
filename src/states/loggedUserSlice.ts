import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioDto } from "../interface/Usuarios/dto/UsuarioDto";

interface UserState {
  idUsuario: number;
  rut: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  contrasena: string;
  chkTerminos: boolean;
  chkOfertas: boolean;
  activo: boolean;
  avatar: number;
}

const initialState: UserState = {
  idUsuario: 0,
  rut: "",
  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",
  contrasena: "",
  chkTerminos: false,
  chkOfertas: false,
  activo: false,
  avatar: 0,
};

const persistedUser = localStorage.getItem("__redux__user__");
const initialUserState = persistedUser
  ? JSON.parse(persistedUser)
  : initialState;

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    save: (state: UserState, action: PayloadAction<UsuarioDto>) => {
      return { ...state, ...action.payload };
    },
    del: () => {
      return initialState;
    },
  },
});

export const { save, del } = userSlice.actions;
export default userSlice.reducer;
