import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface UserInterface{
    userID? : String // 아이디
    password? : String // 패스워드
    email? : String, // 이메일
    nickname? : String, // 닉네임
    address? : String, // 주소
    token? : Number, // 로그인체크용 토큰
    slang? : Number[] | Number, // 찜 목록
}


let userInitialState :UserInterface = {}
if(localStorage.key('user'as any)){
    userInitialState = JSON.parse(localStorage.getItem("user") as any);
}

export const user = createSlice({
    name : "user",
    initialState : userInitialState,
    reducers : {
        loginAction(state,action: PayloadAction<UserInterface>){
            
            const obj = {
                ...action.payload,
                token : Math.floor(Math.random()*(999 - 100 + 1)) + 100
            }

            localStorage.setItem('user',JSON.stringify(obj));

            return obj;

        },
        logoutAction(state){
            return {};
        }
    }
})

export let {loginAction,logoutAction} = user.actions;

const memeberInitialState :UserInterface[] = [
    {
        userID : "admin",
        password : "qq1234",
        email : "admin@test.com",
        nickname : "어드민",
        address : "주소",
    }
];

export const memeber = createSlice({
    name : "memeber",
    initialState : memeberInitialState,
    reducers : {}
})