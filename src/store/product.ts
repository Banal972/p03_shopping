import { PayloadAction, createSlice } from "@reduxjs/toolkit"

/* 
    001 스니커즈
    002 스포츠
    003 샌들/슬리퍼
    456 는 세일 카테고리
    999 부터는 BEST 카테고리
*/

interface ProductState {
    id : Number | String // 상품-아이디
    cate : String | String[] // 카테고리
    src : String // 이미지 URL
    only? : Boolean // 단독상품
    name : String // 상품명
    tag : String[], // 태그
    description : String // 설명
    size : Number[] // 사이즈
    price : Number // 가격
    sale? : Number, // 세일
    hit : number // 조회수
}

const productTagInitialState : String[] = [
    "전체",
    "운동화",
    "농구화",
    "등산화",
    "축구화",
    "부츠",
    "샌들",
    "실내화",
    "기타"
]

const productInitialState : ProductState[] = [
    {
        id : 1,
        cate : "002",
        src : "/img/shoes/shoes01.jpg",
        name : "상품1",
        tag : ["운동화"],
        description : "상품1의 설명문 입니다. 상품1은 운동화 입니다.",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 10000,
        hit : 0
    },
    {
        id : 2,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes02.jpg",
        name : "상품2",
        tag : ["운동화"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 3,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes03.jpg",
        name : "상품3",
        tag : ["운동화"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 4,
        cate : "456",
        only : true,
        src : "/img/shoes/shoes04.jpg",
        name : "상품4",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : "sh01",
        cate : "001",
        src : "/img/shoes/sneakers/high/high01.jpg",
        name : "스니커즈 하이01",
        tag : ["하이"],
        description : "스니커즈 하이01 상품 입니다.\n 이 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        hit : 100
    }
]

export const productTag = createSlice({
    name : "productTag",
    initialState : productTagInitialState,
    reducers : {}
})

export const product = createSlice({
    name : "product",
    initialState : productInitialState,
    reducers : {

    }
});
