import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE: UserWithId[] = []

export interface User {
    name: string;
    rut: string;
    email: string;
}

export type userId = string;

export interface UserWithId extends User {
    id: userId;
}


const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__users__");
    return persistedState ? JSON.parse(persistedState) as UserWithId[] : DEFAULT_STATE;

})();

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            console.log(current(state))
            const id = crypto.randomUUID();
            state.push({ id, ...action.payload })

        },
        deleteUser: (state, action: PayloadAction<userId>) => {
            return state.filter(user => user.id !== action.payload)
        },
        updateUser: (state, action: PayloadAction<UserWithId>) => {
            const userModified = action.payload;
            const index = state.findIndex(usuario => usuario.id === userModified.id);
            state[index] = userModified;
        }
    }
})

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;