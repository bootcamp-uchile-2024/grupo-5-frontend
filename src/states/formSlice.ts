import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
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
  nombre: '',
  rut: '',
  correo: '',
  telefono: '',
  region: '',
  comuna: '',
  direccion: '',
  numero: '',
  referencias: '',
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      saveForm: (state, action: PayloadAction<FormState>) => {
        return { ...state, ...action.payload };
      },
      updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
        const { region, comuna, direccion, numero, referencias } = action.payload;
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