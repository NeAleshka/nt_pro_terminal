import React, {useState} from 'react';
import style from './time.module.css'

const Time = () => {
    const [time, setTime]=useState(new Date())

    setInterval(()=>{
        setTime(new Date())
    },1000)

    return (
        <div className={style.time}>
            {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
        </div>
    );
};

export default Time;