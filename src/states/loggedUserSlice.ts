import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string;
  nombre: string;
}

const initialState: UserState = {
  user: "",
  nombre: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,    
  reducers: {
    save: (state: UserState, action: PayloadAction<UserState>) => {
      console.log("llamando al reducer save");
      const { user, nombre } = action.payload;
      state.user = user;
      state.nombre = nombre;
      return state;
    },
    del: (state: UserState) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const { save, del } = userSlice.actions;
export default userSlice.reducer;