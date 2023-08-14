import {configureStore, createSlice} from "@reduxjs/toolkit";

const user = createSlice({
    name : "user",
    initialState : 0,
    reducers : {}
})

interface ProductState {
    id : Number
    cate : String | String[]
    src : String
    only? : Boolean
    name : String
    description : String
    size : Number[]
    price : Number
    sale? : Number
}

const initialStateProduct : ProductState[] = [
    {
        id : 1,
        cate : "카테고리",
        src : "shoes01.jpg",
        name : "상품1",
        description : "설명문",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 10000,
    },
    {
        id : 2,
        cate : "카테고리2",
        only : true,
        src : "shoes02.jpg",
        name : "상품2",
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
    }
]


const product = createSlice({
    name : "product",
    initialState : initialStateProduct,
    reducers : {}
})

export const store = configureStore({
    reducer : {
        user : user.reducer,
        product : product.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;