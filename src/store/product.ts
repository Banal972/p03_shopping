import { createSlice } from "@reduxjs/toolkit"

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
        cate : "001",
        src : "shoes01.jpg",
        name : "상품1",
        description : "설명문",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 10000,
    },
    {
        id : 2,
        cate : "002",
        only : true,
        src : "shoes02.jpg",
        name : "상품2",
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
    },
    {
        id : 3,
        cate : "003",
        only : true,
        src : "shoes03.jpg",
        name : "상품3",
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
    },
    {
        id : 2,
        cate : "456",
        only : true,
        src : "shoes04.jpg",
        name : "상품4",
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
    }
]

export const product = createSlice({
    name : "product",
    initialState : initialStateProduct,
    reducers : {}
});