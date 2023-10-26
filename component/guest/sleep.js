'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../logic/getTime';

export default function Sleep({ sleep }) {

    const initCurrentTime = new Date();
    const initRemainingTime = getRemainingTime(sleep.sleepState, initCurrentTime);
    const [display, setDisplay] = useState(initRemainingTime);
    const [setBtn, setTimeBtn] = useState(true);

    return (
        <>
            {setBtn ?
                <DisplayTime
                    dp={{ display, setDisplay }}
                    sleep={sleep}
                    btn={{ setBtn, setTimeBtn }}
                /> :
                <TimeSetting
                    sleep={sleep}
                    btn={{ setBtn, setTimeBtn }}
                />}
        </>
    )
}

function DisplayTime({ dp, sleep, btn }) {

    useEffect(() => {
        const timer = setInterval(() => {

            const currentTime = new Date();
            let sleepTime = sleep.sleepState;

            if (sleepTime.getHours() < currentTime.getHours()) {
                sleepTime = getSetTime(1, sleepTime.getHours(), sleepTime.getMinutes(), 0, 0);
            }

            const remainingTime = getRemainingTime(sleepTime, currentTime);

            dp.setDisplay(remainingTime);
        }, 1000);
        return () => { clearInterval(timer) };
    })

    function onClickBtn() {
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true)
    }

    return (
        <>
            <div>
                <div>{`sleep : ${dp.display.rtHours} : ${dp.display.rtMinutes} : ${dp.display.rtSeconds}`}</div>
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


function TimeSetting({ sleep, btn }) {

    const initDate = new Date().getDate();
    const initSleepTime = sleep.sleepState;
    let initSleep = initSleepTime.getHours() * 60 + initSleepTime.getMinutes();

    if (initSleepTime.getDate() > initDate) {
        initSleep = initSleepTime.getHours() * 60 + initSleepTime.getMinutes() + (24 * 60);
    }

    const [selectedSleepTime, setSelectedSleepTime] = useState(initSleep);

    function onClickSelectTime() {
        const timeObj = timeData(selectedSleepTime);
        const setSleepTime = getSetTime(0, timeObj.hours, timeObj.minutes, 0, 0);
        sleep.setSleepState(setSleepTime);
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
    }

    let timeDataObj = timeData(selectedSleepTime);
    const rangeMin = 0;
    const rangeMax = (24 + 12) * 60;
    const rangeCurrentTime = new Date();
    const rangeCurrentTimeMin = rangeCurrentTime.getHours() * 60 + rangeCurrentTime.getMinutes();

    function inputRange(e) {
        let rangeValue = e.target.value;
        if (rangeValue >= rangeCurrentTimeMin && rangeValue <= rangeMax) {
            setSelectedSleepTime(Math.floor(rangeValue));
        }
    }

    return (<>
        <div>{`${timeDataObj.day === 0 ? 'today' : 'tomorrow'} : ${timeDataObj.hours} : ${timeDataObj.minutes}`}</div>
        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selectedSleepTime}
            onChange={(e) => inputRange(e)}
        />
        <button onClick={() => onClickSelectTime()}>save</button >
    </>
    )
}

function timeData(selectedSleepTime) {
    let day = 0;
    let hours = Math.floor(selectedSleepTime / 60);
    const minutes = Math.floor(selectedSleepTime % 60);
    if (hours >= 24) {
        hours = Math.floor(selectedSleepTime / 60 - 24);
        day = 1;
    }
    return { day, hours, minutes, }
}

