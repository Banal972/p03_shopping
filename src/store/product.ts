import { PayloadAction, createSlice } from "@reduxjs/toolkit"

/* 
    001 스니커즈
    002 스포츠
    003 샌들/슬리퍼
    456 는 세일 카테고리
    999 부터는 BEST 카테고리
*/

export interface ProductState {
    id : number // 상품-아이디
    cate : String | String[] // 카테고리
    src : String // 이미지 URL
    only? : Boolean // 단독상품
    name : String // 상품명
    tag : string[], // 태그
    detail? : String,
    description : String // 설명
    size : number[] // 사이즈
    price : number // 가격
    sale? : number, // 세일
    hit : number // 조회수
}

export interface ProudctTag {
    tagNumber : string  // 태그번호
    name : string[]
}

const productTagInitialState : ProudctTag[] = [
    {
        tagNumber : "001",
        name : ["전체"]
    },
    {
        tagNumber : "002",
        name : ["전체"]
    },
    {
        tagNumber : "003",
        name : ["전체"]
    },
    {
        tagNumber : "456",
        name : ["전체"]
    },
    {
        tagNumber : "999",
        name : [
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
    }
]

const productInitialState : ProductState[] = [
    {
        id : 1,
        cate : "002",
        src : "/img/shoes/shoes01.jpg",
        name : "상품1",
        tag : ["운동화"],
        detail : 
        `
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            
            <img src="/img/shoes/shoes01.jpg"></img>

            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.
            상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다.상세정보입니다
        `,
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
        id : 5,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes05.jpg",
        name : "상품5",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 6,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes06.jpg",
        name : "상품6",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 7,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes07.jpg",
        name : "상품7",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 8,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes08.jpg",
        name : "상품8",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 9,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes09.jpg",
        name : "상품9",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 10,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes10.jpg",
        name : "상품10",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 11,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes11.jpg",
        name : "상품11",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 12,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes12.jpg",
        name : "상품12",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 13,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes13.jpg",
        name : "상품13",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 14,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes14.jpg",
        name : "상품14",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 15,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes15.jpg",
        name : "상품15",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 16,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes16.jpg",
        name : "상품16",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 17,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes17.jpg",
        name : "상품17",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 18,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes18.jpg",
        name : "상품18",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 19,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes19.jpg",
        name : "상품19",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 20,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes20.jpg",
        name : "상품20",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 21,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes21.jpg",
        name : "상품21",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 22,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes22.jpg",
        name : "상품22",
        tag : ["기타"],
        description : "상품내용1 상품내용1 상품내용1 상품내용1 상품내용1",
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 25000,
        sale : 25,
        hit : 0
    },
    {
        id : 55,
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
