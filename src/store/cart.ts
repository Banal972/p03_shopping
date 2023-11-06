import {createSlice} from "@reduxjs/toolkit"
import { ProductState } from "./product";

export interface CartInterface extends ProductState{
    amount : number
}

const initialState :CartInterface[] = [

]

const cart = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        addCart(state,action){

            let rs = state.findIndex(el=>{ // findIndex 로 값이 있는지 체크
                return el.id === action.payload.id;
            });

            if(rs > -1){ // 값이 존재하면
                state[rs].amount ++;
            }else{ // 없으면
                state.push(action.payload);
            }

        },
        checkDelete(state,actions){
            return state.filter(elm => !actions.payload.includes(elm.id));
            // 배열끼리 비교하여 중복삭제
        },
        deleteCart(state,actions){
            let rs = state.findIndex(elm=>elm.id === actions.payload);
            if(rs > -1){
                state.splice(rs,1); // splice로 배열삭제
            }
        },
        minusCart(state,actions){
            let rs = state.findIndex(elm=>elm.id === actions.payload);
            state[rs].amount--;
        },
        plusCart(state,actions){
            let rs = state.findIndex(elm=>elm.id === actions.payload);
            state[rs].amount++;
        },
        sizeChangeCart(state,actions){
            let rs = state.findIndex(elm=>elm.id === actions.payload.id);
            state[rs].size = actions.payload.size;
        }
    }
});

export let {addCart,plusCart,minusCart,deleteCart,checkDelete,sizeChangeCart} = cart.actions;

export default cart