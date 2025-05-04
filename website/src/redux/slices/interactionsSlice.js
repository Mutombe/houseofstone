import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: 'interactions',
  initialState: {
    viewedProperties: [],
    favoriteActions: []
  },
  reducers: {
    trackView: (state, action) => {
      state.viewedProperties.push(action.payload);
    },
    trackFavorite: (state, action) => {
      state.favoriteActions.push(action.payload);
    }
  }
});

export const { trackView, trackFavorite } = interactionSlice.actions;
export default interactionSlice.reducer;