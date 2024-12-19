import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string;
  nombres: string;
  avatar: number;
}

const initialState: UserState = {
  user: "",
  nombres: "",
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
    save: (state: UserState, action: PayloadAction<UserState>) => {
      const { user, nombres, avatar } = action.payload;
      state.user = user;
      state.nombres = nombres;
      state.avatar = avatar;
      localStorage.setItem("__redux__user__", JSON.stringify(state));
    },
    del: (state: UserState) => {
      state.user = "";
      state.nombres = "";
      state.avatar = 1;
      localStorage.removeItem("__redux__user__");
    },
  },
});

export const { save, del } = userSlice.actions;
export default userSlice.reducer;
