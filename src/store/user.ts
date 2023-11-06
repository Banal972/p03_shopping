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
    slang? : (Number | String)[] // 찜 목록
}


// 유저관련

let userInitialState :UserInterface | null = {}
if(localStorage.key('user'as any)){
    userInitialState = JSON.parse(localStorage.getItem("user") as any);
}

export const user = createSlice({
    name : "user",
    initialState : userInitialState,
    reducers : {
        loginAction(state,action: PayloadAction<UserInterface>){
            localStorage.setItem('user',JSON.stringify(action.payload));
            return action.payload;
        },
        logoutAction(state){
            localStorage.removeItem('user');
            return null;
        },
        addSlangAction(state,action: PayloadAction<Number|String>){
            
            if(state?.slang === undefined){
                return {
                    ...state,
                    slang : [action.payload]
                }
            }else{
                state?.slang?.push(action.payload);
            }

            // 세션에 저장
            localStorage.setItem('user',JSON.stringify(state));

        },
        removeSlangAction(state,action: PayloadAction<Number|String>){
            const rs = state?.slang?.findIndex(e=>e === action.payload);
            if(typeof rs === "number"){
                if(rs > -1){
                    state?.slang?.splice(rs,1);
                }
            }

            // 세션에 저장
            localStorage.setItem('user',JSON.stringify(state));

        }
    }
})

export let {loginAction,logoutAction,addSlangAction,removeSlangAction} = user.actions;



// 회원 멤버 관련

const memeberInitialState :UserInterface[] = [
    {
        userID : "admin",
        password : "qq1234",
        email : "admin@test.com",
        nickname : "어드민",
        address : "주소",
    }
];

/* if(localStorage.key("member" as any)){

    const memeberData = JSON.parse(localStorage.getItem('memeber') as any);

    memeberData.forEach((el:any) => {
        memeberInitialState.push(el);
    });

} */


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