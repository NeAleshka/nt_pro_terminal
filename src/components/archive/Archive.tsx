import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {IOrderInfo} from "../../interfaces";
import style from './archive.module.css'


const Archive = () => {
    const ordersHistory=useSelector<RootState,IOrderInfo[]>(state => state.storeReducer.history)

    return (
        <div className={style.archive}>
            <header >
               <div className={style.wrapper}>
                   <div className={style.short_item}>Side</div>
                   <div className={style.short_item}>Price</div>
                   <div className={style.middle_item} >Instrument</div>
                   <div className={style.middle_item}>Volume</div>
                   <div className={style.long_item}>Timestamp</div>
               </div>

            </header>
            {
             ordersHistory.length? ordersHistory.map(({volume,name,time,type,price},index)=><ArchiveItem key={index} type={type} price={price} name={name} volume={volume} time={time}/>)
                 :<div className={style.empty}>Archive is empty</div>}
        </div>
    );
};

export default Archive;

const ArchiveItem=({volume,name,type,price,time}:IOrderInfo)=>{
    const orderTypeColor=type==="SELL"?'red':'green'

    return(
        <div className={style.item_wrapper}>
            <div className={style.item_content}>
                <div style={{color:`${orderTypeColor}`,fontWeight:'500'}} className={style.short_item}>{type}</div>
                <div className={style.short_item}>{price}</div>
                <div className={style.middle_item}>{name}</div>
                <div className={style.middle_item}>{volume}</div>
                <div style={{width:'40%'}}>{time}</div>
            </div>
        </div>
    )
}





