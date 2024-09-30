import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types'

const initialState: UserState = {
    username: null,
    email: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; email: string }>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
    },
});

export const selectUser = (state: any) => state.user;

export const { login } = userSlice.actions;

export default userSlice.reducer;