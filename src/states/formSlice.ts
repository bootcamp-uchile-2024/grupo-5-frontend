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
    },
  });

export const { saveForm } = formSlice.actions;
export default formSlice.reducer;