'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime, timeData } from '../../logic/getTime';


export default function Breakfast({ breakfast }) {

    const initCurrentTime = new Date();
    const initRemainingTime = getRemainingTime(breakfast.breakfastState, initCurrentTime);
    const [display, setDisplay] = useState(initRemainingTime);
    const [setBtn, setTimeBtn] = useState(true);

    return (
        <>
            {setBtn ?
                <DisplayTime
                    dp={{ display, setDisplay }}
                    breakfast={breakfast}
                    btn={{ setBtn, setTimeBtn }}
                /> :
                <TimeSetting
                    breakfast={breakfast}
                    btn={{ setBtn, setTimeBtn }}
                />}
        </>
    )
}


function DisplayTime({ dp, breakfast, btn }) {

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            let breakfastTime = breakfast.breakfastState;

            if (breakfastTime.getHours() <= currentTime.getHours()) {
                breakfastTime = getSetTime(1, breakfastTime.getHours(), breakfastTime.getMinutes(), 0, 0);
            }

            const remainingTime = getRemainingTime(breakfastTime, currentTime);
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
                <div>{`breakfast : ${dp.display.rtHours} : ${dp.display.rtMinutes} : ${dp.display.rtSeconds}`}</div>
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


function TimeSetting({ breakfast, btn }) {

    const initBreakfastTime = breakfast.breakfastState;
    let initBreakfast = initBreakfastTime.getHours() * 60 + initBreakfastTime.getMinutes();

    const [selectedBreakfastTime, setSelectedBreakfastTime] = useState(initBreakfast);
    console.log('selectedBreakfastTime', selectedBreakfastTime);

    function onClickSelectTime() {
        const timeObj = timeData(selectedBreakfastTime);
        const setBreakfastTime = getSetTime(0, timeObj.hours, timeObj.minutes, 0, 0);
        breakfast.setBreakfastState(setBreakfastTime);
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
    }

    let timeDataObj = timeData(selectedBreakfastTime);
    const rangeMin = 0;
    const rangeMax = 12 * 60;

    function inputRange(e) {
        let rangeValue = e.target.value;
        setSelectedBreakfastTime(Math.floor(rangeValue));
    }

    return (<>
        <div>{`breakfast ${timeDataObj.hours} : ${timeDataObj.minutes}`}</div>
        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selectedBreakfastTime}
            onChange={(e) => inputRange(e)}
        />
        <button onClick={() => onClickSelectTime()}>save</button >
    </>
    )
}
