import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  idUsuario?: string;
  nombre: string;
  rut: string;
  correo: string;
  telefono: string;
}

const initialState: FormState = {
  idUsuario: "",
  nombre: "",
  rut: "",
  correo: "",
  telefono: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      const { idUsuario } = action.payload;
      if (idUsuario !== undefined) state.idUsuario = idUsuario;
    },
  },
});

export const { saveForm, updateForm } = formSlice.actions;
export default formSlice.reducer;
