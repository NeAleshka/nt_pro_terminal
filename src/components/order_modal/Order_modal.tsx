import React, {useState} from 'react';
import style from './order_modal.module.css'
import {Box, Button, Modal} from "@mui/material";
import {IItemStore, IOrderInfo} from "../../interfaces";
import {useAppDispatch} from "../../store";
import {createOrder} from "../../store/storeSlice";

type ModalOptionType = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    orderType: string
    currentCurrency: IItemStore[]
    currentTradeValue: number
}


const OrderModal = ({showModal, setShowModal, orderType, currentCurrency, currentTradeValue}: ModalOptionType) => {
    const dispatch = useAppDispatch()
    const date=new Date()
    const [volume, setVolume] = useState(0)
    const infoOrder: IOrderInfo = {
        type: orderType,
        price: currentTradeValue,
        name: currentCurrency[0].name,
        volume: volume,
        time:`${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds().toFixed(3)}`
    }

    const createNewOrder = () => {
        dispatch(createOrder(infoOrder))
        setShowModal(false)
    }

    return (
        <Modal open={showModal} className={style.modal}>
            <Box className={style.modal} style={{border: 'none', outline: 'none', backgroundColor: 'white'}}>
                <div className={style.header}>
                    <div className={style.title}>Make order</div>
                    <div style={{cursor: 'pointer'}} onClick={() => setShowModal(false)}>X</div>
                </div>
                <div className={style.info}>
                    <span className={style.type}>{orderType}</span>
                    <span className={style.type}>{currentTradeValue}</span>
                    <span>{currentCurrency[0].name}</span>
                </div>
                <div className={style.volume}>
                    <span>Volume</span>
                    <input type={'number'} onChange={(event) => setVolume(+event.currentTarget.value)}/>
                </div>
                <div className={style.footer}>
                    <Button variant="contained" style={{width: 'fit-content', backgroundColor: 'red'}} onClick={()=>setShowModal(false)}>Cancel</Button>
                    <Button disabled={!volume} variant="contained" style={{width: 'fit-content', marginLeft: '10px'}}
                            onClick={createNewOrder}>OK</Button>
                </div>

            </Box>
        </Modal>
    );
};

export default OrderModal;