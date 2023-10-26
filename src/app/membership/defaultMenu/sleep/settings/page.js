'use client'

import { useEffect, useState } from 'react';
import { timeData } from '../../../../../../logic/getTime';

export default function SleepSettings({ dp, sleep, btn }) {

    const [selectedSleepTime, setSelectedSleepTime] = useState(0); //숫자로 구성된 시간

    useEffect(() => {
        const initSleepTime = sleep.sleep; // db 정규 설정값

        let initSleep = initSleepTime.getHours() * 60 + initSleepTime.getMinutes();  //분단위로 변환된 값

        // if (initSleepTime.getDate() > (new Date().getDate())) {
        //     initSleep = initSleepTime.getHours() * 60 + initSleepTime.getMinutes() + (24 * 60); //설정 시간이 현재보다 클 경우  24시간을 더해준다.
        // }

        setSelectedSleepTime(initSleep);
    }, [sleep.sleep])

    function onClickSelectTime(e) {
        e.preventDefault();
        const timeObj = timeData(selectedSleepTime);
        // const setSleepTime = getSetTime(timeObj.day, timeObj.hours, timeObj.minutes, 0, 0);

        const title = e.target.value;
        const settings = [0, timeObj.hours, timeObj.minutes, 0, 0]

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, settings })
        }

        const url = 'http://localhost:9999/timeList/2';
        fetch(url, options)
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
    }


    function inputValue() {
        const currentValue = new Date().getHours() * 60 + new Date().getMinutes();
        if (selectedSleepTime <= currentValue) {
            return selectedSleepTime + (24 * 60);
        } else {
            return selectedSleepTime;
        }
    }

    function inputRange(e) {
        let rangeValue = e.target.value;
        if (rangeValue >= rangeCurrentTimeMin) {
            setSelectedSleepTime(Math.floor(rangeValue));
        }
    }

    let timeDataObj = timeData(inputValue());
    const rangeMin = 0;
    const rangeMax = (24 + 12) * 60;
    const rangeCurrentTime = new Date();
    const rangeCurrentTimeMin = rangeCurrentTime.getHours() * 60 + rangeCurrentTime.getMinutes();

    return (<>
        <div>
            {timeDataObj !== null ? `${timeDataObj.day === 0 ? 'today' : 'tomorrow'} : ${timeDataObj.hours} : ${timeDataObj.minutes}` : `loading...`}
        </div>

        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={inputValue()}
            onChange={(e) => inputRange(e)}
        />
        <button value={'sleep'} onClick={(e) => { onClickSelectTime(e) }}>save</button >
    </>)
}