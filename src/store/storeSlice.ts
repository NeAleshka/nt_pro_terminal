import {createAction, createSlice} from "@reduxjs/toolkit";
import { IOrderInfo, IStore} from "../interfaces";

const initialState: IStore ={
    items:[
        {
            name: 'USD/RUB TOM',
            sell: 1.222,
            buy: 1.322,
        },
        {
            name: 'GBP/USD_SPOT',
            sell: 1.456,
            buy: 1.767,
        },
        {
            name: 'USD/CAD TOM',
            sell: 1.787,
            buy: 1.897
        },

    ],
    currentTradeValue:0,
    history:[]
}

export const randomChangeCurrency = createAction('storeSlice/randomChangeCurrency',
    () => {
        return {
            payload: {}
        }
    })

export const setCurrentTradeValue = createAction('storeSlice/setCurrentTradeValue',
    (currentTradeValue:number) => {
        return {
            payload: {currentTradeValue}
        }
    })

export const createOrder = createAction('storeSlice/createOrder',
    (order:IOrderInfo) => {
        return {
            payload: {order}
        }
    })


const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(randomChangeCurrency, (state) => {
                state.items.forEach(item => {
                    item.sell = Number((Math.random() * (2 - 1) + 1).toFixed(3))
                    item.buy = Number((Math.random() * (2 - 1) + 1).toFixed(3))
                })
            })
            .addCase(setCurrentTradeValue,(state, {payload})=>{
                state.currentTradeValue=payload.currentTradeValue
            })
            .addCase(createOrder,(state, {payload})=>{
                state.history.push(payload.order)
            })
    }
})

export default storeSlice.reducer

