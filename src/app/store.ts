import {configureStore, createSlice} from "@reduxjs/toolkit";
import { product } from "../store/product";
import { memeber, user } from "../store/user";

export const store = configureStore({
    reducer : {
        user : user.reducer,
        product : product.reducer,
        memeber : memeber.reducer
    },
    devTools : process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;