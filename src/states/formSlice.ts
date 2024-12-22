import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  idUsuario?: string;
  nombre: string;
  rut: string;
  correo: string;
  telefono: string;
  region: string;
  comuna: string;
  direccion: string;
  numero: string;
  referencias?: string;
}

const initialState: FormState = {
  idUsuario: "",
  nombre: "",
  rut: "",
  correo: "",
  telefono: "",
  region: "",
  comuna: "",
  direccion: "",
  numero: "",
  referencias: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      const { idUsuario, region, comuna, direccion, numero, referencias } =
        action.payload;
      if (idUsuario !== undefined) state.idUsuario = idUsuario;
      if (region !== undefined) state.region = region;
      if (comuna !== undefined) state.comuna = comuna;
      if (direccion !== undefined) state.direccion = direccion;
      if (numero !== undefined) state.numero = numero;
      if (referencias !== undefined) state.referencias = referencias;
    },
  },
});

export const { saveForm, updateForm } = formSlice.actions;
export default formSlice.reducer;
