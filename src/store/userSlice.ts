import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface UserState {
    users: User[];
    loading: boolean;
}

const initialState: UserState = {
    users: [],
    loading: false,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
    },
});

export const { setLoading, setUsers } = userSlice.actions;
export default userSlice.reducer;
