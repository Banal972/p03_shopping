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
        name : ["전체","하이","로우"]
    },
    {
        tagNumber : "002",
        name : [
            "전체",
            "운동화",
            "농구화",
            "등산화",
        ]
    },
    {
        tagNumber : "003",
        name : ["전체"]
    },
    {
        tagNumber : "456",
        name : [
            "전체",
            "스니커즈",
            "운동화",
            "농구화",
            "등산화",
        ]
    },
    {
        tagNumber : "999",
        name : [
            "전체",
            "스니커즈",
            "운동화",
            "농구화",
            "등산화",
        ]
    }
]

const productInitialState : ProductState[] = [
    {
        id : 1,
        cate : "001",
        src : "/img/shoes/sneakers/high/high01.jpg",
        name : "스니커즈 하이01",
        tag : ["하이","스니커즈"],
        detail : 
        `
            스니커즈 하이01 상품 입니다.<br/> 
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/sneakers/high/high01.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `스니커즈 하이01 상품 입니다. \n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [250,260,270,280],
        price : 99000,
        hit : 0
    },

    {
        id : 2,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes02.jpg",
        name : "운동화 상품01",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품01 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품01 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 55000,
        sale : 0,
        hit : 0
    },

    {
        id : 3,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes03.jpg",
        name : "농구화 상품01",
        tag : ["농구화"],
        detail : 
        `
            농구화 상품01 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/sneakers/high/high01.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.

        `,
        description : `농구화 상품01 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [260,265,270,275],
        price : 350000,
        sale : 0,
        hit : 0
    },

    {
        id : 4,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes04.jpg",
        name : "운동화 상품02",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품02 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품02 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 55000,
        sale : 5,
        hit : 0
    },

    {
        id : 5,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes05.jpg",
        name : "운동화 상품03",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품03 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품03 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [250,280],
        price : 35000,
        sale : 0,
        hit : 0
    },

    {
        id : 6,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes06.jpg",
        name : "농구화 상품02",
        tag : ["농구화"],
        detail : 
        `
            농구화 상품02 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes06.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.

        `,
        description : `농구화 상품02 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [270,275,280],
        price : 250000,
        sale : 2.5,
        hit : 0
    },

    {
        id : 7,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes07.jpg",
        name : "운동화 상품04",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품04 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes07.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `운동화 상품04 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 99000,
        sale : 0,
        hit : 0
    },

    {
        id : 8,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes08.jpg",
        name : "운동화 상품05",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품05 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes08.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `운동화 상품05 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [240,245,250,255],
        price : 77000,
        sale : 10,
        hit : 0
    },

    {
        id : 9,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes09.jpg",
        name : "농구화 상품03",
        tag : ["농구화"],
        detail : 
        `
            농구화 상품03 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes09.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.

        `,
        description : `농구화 상품03 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 150000,
        sale : 5,
        hit : 0
    },

    {
        id : 10,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes10.jpg",
        name : "운동화 상품06",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품06 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes10.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `운동화 상품06 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [270,275],
        price : 75000,
        sale : 0,
        hit : 0
    },

    {
        id : 11,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes11.jpg",
        name : "운동화 상품07",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품07 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품07 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,235,240,245,250,255,260,265,270,275],
        price : 99000,
        sale : 0,
        hit : 0
    },

    {
        id : 12,
        cate : "001",
        only : true,
        src : "/img/shoes/sneakers/high/high03.jpg",
        name : "스니커즈 하이02",
        tag : ["하이","스니커즈"],
        detail : 
        `
            스니커즈 하이02 상품 입니다.<br/> 
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/sneakers/high/high03.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `스니커즈 하이02 상품 입니다. \n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [250,260,270,275],
        price : 94000,
        sale : 15,
        hit : 0
    },

    {
        id : 13,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes13.jpg",
        name : "등산화 상품01",
        tag : ["등산화"],
        detail : 
        `
            등산화 상품01 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes13.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `등산화 상품01 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [270,275,280],
        price : 125000,
        sale : 5,
        hit : 0
    },

    {
        id : 14,
        cate : "001",
        only : true,
        src : "/img/shoes/sneakers/high/high04.jpg",
        name : "스니커즈 하이03",
        tag : ["하이","스니커즈"],
        detail : 
        `
            스니커즈 하이03 상품 입니다.<br/> 
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/sneakers/high/high04.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `스니커즈 하이03 상품 입니다. \n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [250,260,270,280],
        price : 85000,
        sale : 10,
        hit : 0
    },

    {
        id : 15,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes15.jpg",
        name : "운동화 상품08",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품08 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품08 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,235,240,245,250,255,260,265,270,275,280],
        price : 50000,
        sale : 0,
        hit : 0
    },

    {
        id : 16,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes16.jpg",
        name : "운동화 상품09",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품09 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품09 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [260,265,270,275,280,285,290],
        price : 60000,
        sale : 0,
        hit : 0
    },

    {
        id : 17,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes17.jpg",
        name : "운동화 상품10",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품10 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품10 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [230,240,250,260,270],
        price : 66000,
        sale : 5,
        hit : 0
    },

    {
        id : 18,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes18.jpg",
        name : "농구화 상품04",
        tag : ["농구화"],
        detail : 
        `
            농구화 상품04 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes18.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.

        `,
        description : `농구화 상품04 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [265,270,275,280,285,290],
        price : 275000,
        sale : 5,
        hit : 0
    },

    {
        id : 19,
        cate : "001",
        src : "/img/shoes/sneakers/low/low01.jpg",
        name : "스니커즈 로우01",
        tag : ["로우","스니커즈"],
        detail : 
        `
            스니커즈 로우01 상품 입니다.<br/> 
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/sneakers/low/low01.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `스니커즈 로우01 상품 입니다. \n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [260,265,270,275,280],
        price : 75000,
        sale : 10,
        hit : 0
    },

    {
        id : 20,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes20.jpg",
        name : "운동화 상품11",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품11 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : `운동화 상품11 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [260,265,270,275],
        price : 45000,
        sale : 0,
        hit : 0
    },

    {
        id : 21,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes21.jpg",
        name : "운동화 상품12",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품12 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes21.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `운동화 상품12 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [260,265,270,275,280],
        price : 75000,
        sale : 10,
        hit : 0
    },

    {
        id : 22,
        cate : "002",
        only : true,
        src : "/img/shoes/shoes22.jpg",
        name : "운동화 상품13",
        tag : ["운동화"],
        detail : 
        `
            운동화 상품13 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
            <br/>
            <img src="/img/shoes/shoes22.jpg"></img>
            <br/>
            본 상품의 이미지는 상업적으로 사용하고 있지않습니다.
        `,
        description : `운동화 상품13 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.`,
        size : [260,265,270,275,280,285],
        price : 76000,
        sale : 5,
        hit : 0
    },

    {
        id : 23,
        cate : "001",
        src : "/img/shoes/sneakers/high/high02.jpg",
        name : "스니커즈 하이04",
        tag : ["하이","스니커즈"],
        detail : 
        `
            스니커즈 하이04 상품 입니다.<br/>
            본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.
        `,
        description : "스니커즈 하이04 상품 입니다.\n 본 상품은 포트폴리오 전용으로 사용하므로 실제로는 사용되지 않고 있는 상품입니다.",
        size : [260,265,270,275],
        price : 75000,
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
