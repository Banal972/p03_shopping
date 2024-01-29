// 상품 태그 타입
export interface TagType {
    tagNumber : string,
    name : string[]
}

// 상품 타입
export interface ProductType {
    id : number // 아이디
    cate : String | String[] // 카테고리
    src : string // 이미지주소
    name : string // 상품명
    tag : string[] // 태그
    description : string // 상품설명
    size : number[] // 사이즈
    price : number // 가격
    detail? : string // 상품내용
    only? : Boolean // 단독상품
    sale? : number, // 세일
    hit : number // 조회수
}

// 장바구니
export interface CartType {
    product : ProductType
    id : number
    size : number
    amount : number
}

// 유저
export interface UserType {
    userID? : string // 아이디
    password? : string // 패스워드
    email? : string // 이메일
    name? : string // 이름
    nickname? : string // 닉네임
    zipcode? : string
    address? : string // 주소
    address2? : string // 상세주소
    phone? : string // 휴대폰
    slang? : number[] // 찜 목록
}


// 상품구매
export interface BuyProductType extends ProductType{
    product_size : number
    product_amount : number
}

// 구매 히스토리
export interface HistoryType {
    user : String | undefined
    token : number
    date : string
    buyItem : BuyProductType[]
    delivery : {
        request_select: string;
        request_input: string;
        d_name? : String
        d_phone? : String
        d_addr1? : String
        d_addr2? : String
    }
    pay : string
    total_pay : {
        total: number;
        total_product: number;
        total_sale: number;
        delivery_pay: number;
    }
}

// 구매타입
export interface BuyType {
    product_id : number
    product_size : number
    product_amount : number
}

// 문의타입

export interface InquiryType{
    write : string
    user : string
    title : string
    cont : string
    token : number
    date : number
}

export interface inquiryID{
    [productID : number] : InquiryType[]
}

export interface InquirySubmit{
    productID : number,
    payload : InquiryType
}