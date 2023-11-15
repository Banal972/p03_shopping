import {createSlice,PayloadAction} from "@reduxjs/toolkit"


export interface inquiryData{
    write : string
    user : string
    title : string
    cont : string
    token : number
    date : number
}

export interface inquirySubmit{
    productID : number,
    payload : inquiryData
}

interface inquiryInterface{
    [productID : number] : inquiryData[]
}

let inquiryInitialState : inquiryInterface = {
    2 : [
        {
            write: "어드민",
            user: "admin",
            title: "asdsadas",
            cont: "<p>dasdsadsadsad</p>",
            token: 1700055019616,
            date: 1700055020481
        },
        {
            write: "어드민",
            user: "admin",
            title: "test2",
            cont: "<p>test2</p>",
            token: 166666666,
            date: 1700055020481
        }
    ]
}

export const inquiry = createSlice({
    name : "inquiry",
    initialState : inquiryInitialState,
    reducers : {
        addAction(state,action : PayloadAction<inquirySubmit>){

            if(action.payload.productID in state){ // obj가 있으면

                state[action.payload.productID].push(action.payload.payload);

            }else{ // obj가 없으면
                return {
                    ...state,
                    [action.payload.productID] : [action.payload.payload]
                }
            }

        },
        updateAction(state,action : PayloadAction<inquirySubmit>){

            const rs = state[action.payload.productID].findIndex(e=>e.token === action.payload.payload.token);

            if(rs > -1){

                const data = {
                    ...action.payload.payload,
                }

                state[action.payload.productID][rs] = data;

            }

        },
        deleteAction(state,action){

            const {productID,user,token} = action.payload;
            const rs = state[productID].findIndex(e=>e.user === user && e.token === token);

            if(rs > -1){
                state[productID].splice(rs,1);   
            }

        }
    }
});

export let {addAction,updateAction,deleteAction} = inquiry.actions