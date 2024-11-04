import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    user: string,
    email: string,
}

const initialState: UserState = {
    user: "",
    email: "",
};

export const userSlice = createSlice({
    name: 'user',
    initialState,    
    reducers: {
        save: (state: UserState, action: PayloadAction<UserState>) => {
            console.log("llamando al reducer save");
            const { user, email } = action.payload;
            state.user = user;
            state.email = email;
            return state;
        },

        del: (state: UserState) => {
            state = {...initialState};
            return state;
        },
        updateMail: (state: UserState, action: PayloadAction<string>) => {
            state.email = action.payload;
            return state;
        }
    },
})

export const { save, del } = userSlice.actions;
export default userSlice.reducer;