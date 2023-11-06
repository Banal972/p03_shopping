import {configureStore, createSlice} from "@reduxjs/toolkit";
import { product, productTag } from "../store/product";
import { memeber, user } from "../store/user";
import cart from "../store/cart";

export const store = configureStore({
    reducer : {
        memeber : memeber.reducer,
        user : user.reducer,
        product : product.reducer,
        productTag : productTag.reducer,
        cart : cart.reducer
    },
    devTools : process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;