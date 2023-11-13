import { createSlice,PayloadAction } from "@reduxjs/toolkit"

export interface HistoryInterface {
    buyToken : number
    userID : string
    name : string
    src : string
    size : number
    price : number
    buydate : Date
}

const hitoryState : HistoryInterface[] = [
    {
        buyToken : 12321321321,
        userID : "admin",
        name : "신발",
        src : "/img/shoes/sneakers/high/high01.jpg",
        size : 230,
        price : 25000,
        buydate : new Date()
    },
    {
        buyToken : 12321321321,
        userID : "admin",
        name : "신발",
        src : "/img/shoes/sneakers/high/high01.jpg",
        size : 230,
        price : 25000,
        buydate : new Date()
    },
    {
        buyToken : 12321321321,
        userID : "test",
        name : "신발",
        src : "/img/shoes/sneakers/high/high01.jpg",
        size : 230,
        price : 25000,
        buydate : new Date()
    }
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