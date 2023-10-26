'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../logic/getTime';


export default function Lunch({ lunch }) {

    const initCurrentTime = new Date();
    const initRemainingTime = getRemainingTime(lunch.lunchState, initCurrentTime);
    const [display, setDisplay] = useState(initRemainingTime);
    const [setBtn, setTimeBtn] = useState(true);

    return (
        <>
            {setBtn ?
                <DisplayTime
                    dp={{ display, setDisplay }}
                    lunch={lunch}
                    btn={{ setBtn, setTimeBtn }}
                /> :
                <TimeSetting
                    lunch={lunch}
                    btn={{ setBtn, setTimeBtn }}
                />}
        </>
    )
}


function DisplayTime({ dp, lunch, btn }) {

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            let lunchTime = lunch.lunchState;

            if (lunchTime.getHours() <= currentTime.getHours()) {
                lunchTime = getSetTime(1, lunchTime.getHours(), lunchTime.getMinutes(), 0, 0);
            }

            const remainingTime = getRemainingTime(lunchTime, currentTime);
            dp.setDisplay(remainingTime);
        }, 1000);
        return () => { clearInterval(timer) };
    })

    function onClickBtn(e) {
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true)
    }

    return (
        <>
            <div>
                <div>{`lunch : ${dp.display.rtHours} : ${dp.display.rtMinutes} : ${dp.display.rtSeconds}`}</div>
                <div>{`setting time 
                : ${dp.display.setTimeData.getMonth()}
                / ${dp.display.setTimeData.getDate()} 
                - ${dp.display.setTimeData.getHours()} 
                : ${dp.display.setTimeData.getMinutes()}`}</div>
                <button onClick={(e) => onClickBtn(e)}>set</button>
            </div >
        </>
    )
}


function TimeSetting({ lunch, btn }) {

    const initDate = new Date().getDate();
    const initlunchTime = lunch.lunchState;
    let initlunch = initlunchTime.getHours() * 60 + initlunchTime.getMinutes();

    if (initlunchTime.getDate() > initDate) {
        initlunch = initlunchTime.getHours() * 60 + initlunchTime.getMinutes() + (24 * 60);
    }

    const [selectedlunchTime, setSelectedlunchTime] = useState(initlunch);

    function onClickSelectTime() {
        const timeObj = timeData(selectedlunchTime);
        const setlunchTime = getSetTime(0, timeObj.hours, timeObj.minutes, 0, 0);
        lunch.setLunchState(setlunchTime);
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
    }

    let timeDataObj = timeData(selectedlunchTime);
    const rangeMin = (12 * 60);
    const rangeMax = (17 * 60);

    function inputRange(e) {
        let rangeValue = e.target.value;
            setSelectedlunchTime(Math.floor(rangeValue));
    }

    return (<>
        <div>{`lunch ${timeDataObj.hours} : ${timeDataObj.minutes}`}</div>
        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selectedlunchTime}
            onChange={(e) => inputRange(e)}
        />
        <button onClick={() => onClickSelectTime()}>save</button >
    </>
    )
}

function timeData(selectedlunchTime) {
    let day = 0;
    let hours = Math.floor(selectedlunchTime / 60);
    const minutes = Math.floor(selectedlunchTime % 60);
    if (hours >= 24) {
        hours = Math.floor(selectedlunchTime / 60 - 24);
        day = 1;
    }
    return { day, hours, minutes, }
}

