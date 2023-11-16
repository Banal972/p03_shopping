import {createSlice} from "@reduxjs/toolkit"
import { ProductState } from "./product";

export interface CartInterface extends ProductState{
    amount : number
}

const initialState :CartInterface[] = []

const cart = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        addCart(state,action){
            
            const {id,size} = action.payload

            let rs = state.findIndex(el=>{ // findIndex 로 값이 있는지 체크
                return el.id === id && el.size === size;
            });

            if(rs > -1){ // 값이 존재하면
                state[rs].amount ++;
            }else{ // 없으면
                state.push(action.payload);
            }

        },
        chengeCart(state,action){

            const {id,size,amount} = action.payload

            let rs = state.findIndex(el=>{ // findIndex 로 값이 있는지 체크
                return el.id === id && el.size === size;
            });

            if(rs > -1){ // 값이 존재하면
                state[rs].amount = amount;
            }else{ // 없으면
                state.push(action.payload);
            }

        },
        checkDelete(state,action){
            // console.log(action);
            return state.filter(elm => !action.payload.includes(`${elm.id}${elm.size}`));
            // 배열끼리 비교하여 중복삭제
        },
        allDelete(state,action){
            return []; // 전체삭제
        },
        deleteCart(state,action){

            const {id,size} = action.payload
            
            let rs = state.findIndex(elm=>elm.id === id && elm.size === size);
            if(rs > -1){
                state.splice(rs,1); // splice로 배열삭제
            }

        },
        minusCart(state,action){

            const {id,size} = action.payload

            let rs = state.findIndex(elm=>elm.id === id && elm.size === size);
            state[rs].amount--;

        },
        plusCart(state,action){

            const {id,size} = action.payload

            let rs = state.findIndex(elm=>elm.id === id && elm.size === size);
            state[rs].amount++;

        },
        sizeChangeCart(state,actions){
            let rs = state.findIndex(elm=>elm.id === actions.payload.id);
            state[rs].size = actions.payload.size;
        }
    }
});

export let {addCart,plusCart,minusCart,deleteCart,checkDelete,sizeChangeCart,allDelete,chengeCart} = cart.actions;

export default cart