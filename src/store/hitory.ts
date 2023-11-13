import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { ProductState } from "./product"

export interface BuyProduct extends ProductState{
    product_size : number
    product_amount : number
}
  

export interface HistoryInterface {
    user : String | undefined
    token : number
    date : string
    buyItem : BuyProduct[]
    delivery : {
        request_select: string;
        request_input: string;
        d_name: String | undefined;
        d_phone: String | undefined;
        d_addr1: String | undefined;
        d_addr2: String | undefined;
    }
    pay : string
    total_pay : {
        total: number;
        total_product: number;
        total_sale: number;
        delivery_pay: number;
    }
}

const hitoryState : HistoryInterface[] = [

]

export const history = createSlice({
    name : "historyBuy",
    initialState : hitoryState,
    reducers : {
        addAction (state, action : PayloadAction<HistoryInterface>){
            state.push(action.payload);
        }
    }
});


export const {addAction} = history.actions