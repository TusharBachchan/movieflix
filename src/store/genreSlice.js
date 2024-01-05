import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedGenre : "All", // By default we will show results for all genres
    previousGenre : "All"
}

const genreSlice = createSlice({
    name : "genre",
    initialState,
    reducers : {
        selectGenre : (state, action) => {
            state.previousGenre = state.selectedGenre;
            state.selectedGenre = action.payload.selectedGenre;
        }
    }
})

export const {selectGenre} = genreSlice.actions;
export default genreSlice.reducer;