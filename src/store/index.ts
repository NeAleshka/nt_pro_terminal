import {configureStore} from '@reduxjs/toolkit'
import storeReducer from "./storeSlice";
import {useDispatch} from "react-redux";



const index = configureStore({
    reducer: {
        storeReducer:storeReducer
    }
})

export type RootState = ReturnType<typeof index.getState>

export type AppDispatch = typeof index.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default index