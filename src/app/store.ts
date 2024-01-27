import {configureStore, createSlice} from "@reduxjs/toolkit";
import { product, productTag } from "../../remove/store/product";
import { memeber, user } from "../../remove/store/user";
import cart from "../../remove/store/cart";
import { history } from "../../remove/store/hitory";
import { inquiry } from "../../remove/store/inquiry";

export const store = configureStore({
    reducer : {
        memeber : memeber.reducer,
        user : user.reducer,
        product : product.reducer,
        productTag : productTag.reducer,
        cart : cart.reducer,
        history : history.reducer,
        inquiry : inquiry.reducer
    },
    devTools : process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;