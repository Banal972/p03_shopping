import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface UserInterface{
    userID? : String // 아이디
    password? : String // 패스워드
    email? : String // 이메일
    name? : String // 이름
    nickname? : String // 닉네임
    zipcode? : String | Number // 닉네임
    address? : String // 주소
    address2? : String // 상세주소
    phone? : String // 휴대폰
    token? : Number // 로그인체크용 토큰
    slang? : Number[] | Number // 찜 목록
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
            localStorage.removeItem('user');
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

if(localStorage.key("member" as any)){

    const memeberData = JSON.parse(localStorage.getItem('memeber') as any);

    memeberData.forEach((el:any) => {
        memeberInitialState.push(el);
    });

}

export const memeber = createSlice({
    name : "memeber",
    initialState : memeberInitialState,
    reducers : {
        addAction(state,action : PayloadAction<UserInterface>){

            if(localStorage.key("member" as any)){

                const memeberData = JSON.parse(localStorage.getItem('memeber') as any);

                localStorage.setItem('memeber',JSON.stringify([
                    ...memeberData,
                    action.payload
                ]));

            }else{

                localStorage.setItem('memeber',JSON.stringify([action.payload]))

            }

            state.push(action.payload);
        }
    }
})

export let {addAction} = memeber.actions;