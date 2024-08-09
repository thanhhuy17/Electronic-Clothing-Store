// import { configureStore } from "@reduxjs/toolkit";
// import productSliceApp from "../reducer/productReducer";
// import authSliceH from "../reducer/authSlice";
// import userSliceH from "../reducer/userSlice";

// export const store = configureStore({
//     reducer: {
//         product: productSliceApp,
//         auth: authSliceH,
//         user: userSliceH
//     }
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


// Redux Persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSliceApp from "../reducer/productReducer";
import authSliceH from "../reducer/authSlice";
import userSliceH from "../reducer/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    product: productSliceApp,
    auth: authSliceH,
    user: userSliceH
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
    //     serializableCheck:{
    //     }
    //   })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch