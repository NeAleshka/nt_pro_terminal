import React, {useEffect, useState} from 'react';
import Time from "../time/Time";
import style from './trading.module.css'
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {IItemStore} from "../../interfaces";
import {randomChangeCurrency, setCurrentTradeValue} from "../../store/storeSlice";
import OrderModal from "../order_modal/Order_modal";

type OperationType={
    type:string
    color:string
    treadValue:number
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
    setOrderType:React.Dispatch<React.SetStateAction<string>>
}

type CurrencyPropsOption={
    setCurrencyName: React.Dispatch<React.SetStateAction<string>>
    currencyArray:IItemStore[]
}


const Trading = () => {
    const currencyArray=useSelector<RootState,IItemStore[]>(state => state.storeReducer.items)
    const [currencyName,setCurrencyName]=useState<string>(currencyArray[0].name)
    const currentCurrency=currencyArray.filter(item=>item.name===currencyName)
    const dispatch=useAppDispatch()
    const [showModal,setShowModal]=useState(false)
    const [orderType,setOrderType]=useState('')
    const currentTradeValue=useSelector<RootState,number>(state => state.storeReducer.currentTradeValue)

    useEffect(()=>{
        const intervalId=setInterval(()=>{
            dispatch(randomChangeCurrency())
        },5000)
        return ()=>{
            clearInterval(intervalId)
        }
    },[])

    return (
        <div>
            <Time/>
            <Currency setCurrencyName={setCurrencyName} currencyArray={currencyArray}/>
            <OrderModal showModal={showModal} setShowModal={setShowModal} orderType={orderType} currentCurrency={currentCurrency} currentTradeValue={currentTradeValue}/>
            <div className={style.operation_wrapper}>
                <Operation type={'BUY'} color={'green'} treadValue={currentCurrency[0].buy} setShowModal={setShowModal} setOrderType={setOrderType}/>
                <Operation type={'SELL'} color={'red'} treadValue={currentCurrency[0].sell} setShowModal={setShowModal} setOrderType={setOrderType}/>
            </div>

        </div>
    );
};

export default Trading;


const Currency = ({setCurrencyName,currencyArray}:CurrencyPropsOption) => {
    return (
        <div className={style.wrapper}>
            <select className={style.select} onChange={(event)=>setCurrencyName(event.currentTarget.value)}>
                {
                    currencyArray.map((item,index)=><option key={index}>{item.name}</option>)
                }
            </select>
        </div>
    )
}

const Operation = ({type,color,treadValue,setShowModal,setOrderType}:OperationType) => {
    const dispatch=useAppDispatch()
    const operationClick = () => {
        setShowModal(true)
        setOrderType(type)
        dispatch(setCurrentTradeValue(treadValue))
    }

  return(
      <div className={style.operation} style={{color:`${color}`}} onClick={operationClick}>
          {type}
          <div>{treadValue}</div>
      </div>
  )
}