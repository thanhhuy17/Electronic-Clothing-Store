import { configureStore } from "@reduxjs/toolkit";
import productSliceApp from "../reducer/productReducer";

export const store = configureStore({
    reducer: {
        product: productSliceApp
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch