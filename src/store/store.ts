import { configureStore } from "@reduxjs/toolkit";
import productSliceApp from "../reducer/productReducer";
import authSliceH from "../reducer/authSlice";
import userSliceH from "../reducer/userSlice";

export const store = configureStore({
    reducer: {
        product: productSliceApp,
        auth: authSliceH,
        user: userSliceH
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch