import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import favoriteReducer from './favoriteSlice';

const store = configureStore({
    reducer: {
        users: userReducer,
        favorites: favoriteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
