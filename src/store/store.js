import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "./genreSlice";

const store = configureStore({
    reducer : {
        genre : genreSlice
    }
})

export default store