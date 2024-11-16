import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    user: string,
}

const initialState: UserState = {
    user: "",
};

export const userSlice = createSlice({
    name: 'user',
    initialState,    
    reducers: {
        save: (state: UserState, action: PayloadAction<UserState>) => {
            console.log("llamando al reducer save");
            const { user} = action.payload;
            state.user = user;
            return state;
        },

        del: (state: UserState) => {
            state = {...initialState};
            return state;
        },
    },
})

export const { save, del } = userSlice.actions;
export default userSlice.reducer;