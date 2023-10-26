'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime, timeData } from '../../logic/getTime';

export default function Dinner({ dinner }) {

    const initCurrentTime = new Date();
    const initRemainingTime = getRemainingTime(dinner.dinnerState, initCurrentTime);
    const [display, setDisplay] = useState(initRemainingTime);
    const [setBtn, setTimeBtn] = useState(true);

    return (
        <>
            {setBtn ?
                <DisplayTime
                    dp={{ display, setDisplay }}
                    dinner={dinner}
                    btn={{ setBtn, setTimeBtn }}
                /> :
                <TimeSetting
                    dinner={dinner}
                    btn={{ setBtn, setTimeBtn }}
                />}
        </>
    )
}


function DisplayTime({ dp, dinner, btn }) {

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            let dinnerTime = dinner.dinnerState;

            if (dinnerTime.getHours() <= currentTime.getHours()) {
                dinnerTime = getSetTime(1, dinnerTime.getHours(), dinnerTime.getMinutes(), 0, 0);
            }

            const remainingTime = getRemainingTime(dinner.dinnerState, currentTime);
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
                <div>{`dinner : ${dp.display.rtHours} : ${dp.display.rtMinutes} : ${dp.display.rtSeconds}`}</div>
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

function TimeSetting({ dinner, btn }) {
    const initDate = new Date().getDate();
    const initdinnerTime = dinner.dinnerState;
    let initdinner = initdinnerTime.getHours() * 60 + initdinnerTime.getMinutes();

    if (initdinnerTime.getDate() > initDate) {
        initdinner = initdinnerTime.getHours() * 60 + initdinnerTime.getMinutes() + (24 * 60);
    }

    const [selecteddinnerTime, setSelecteddinnerTime] = useState(initdinner);

    function onClickSelectTime() {
        const timeObj = timeData(selecteddinnerTime);
        const setdinnerTime = getSetTime(timeObj.day, timeObj.hours, timeObj.minutes, 0, 0);
        dinner.setDinnerState(setdinnerTime);
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
    }

    let timeDataObj = timeData(selecteddinnerTime);
    const rangeMin = (17 * 60);
    const rangeMax = (24 * 60);

    function inputRange(e) {
        let rangeValue = e.target.value;
        setSelecteddinnerTime(Math.floor(rangeValue));
    }

    return (<>
        <div>{`dinner ${timeDataObj.hours} : ${timeDataObj.minutes}`}</div>
        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selecteddinnerTime}
            onChange={(e) => inputRange(e)}
        />
        <button onClick={() => onClickSelectTime()}>save</button >
    </>
    )
}