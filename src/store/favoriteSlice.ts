import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from '../types';

interface FavoriteState {
    photos: Photo[];
}

const initialState: FavoriteState = {
    photos: [],
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<Photo>) {
            const photo = action.payload;
            const index = state.photos.findIndex((p) => p.id === photo.id);
            if (index >= 0) {
                state.photos.splice(index, 1);
            } else {
                state.photos.push(photo);
            }
        },
    },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
