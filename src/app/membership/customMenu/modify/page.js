'use client'

import { useEffect, useState } from 'react';
import { getSetTime, timeData } from '../../../../../logic/getTime';
import { useParams, useRouter } from 'next/navigation';

export default function CustomMenuModifyPage({ td, dp, btn }) {

    const router = useRouter();

    const [selectedTime, setSelectedTime] = useState(0); //숫자로 구성된 시간

    useEffect(() => {
        const initTime = getSetTime(...td.timeData.settings); // db 정규 설정값
        let initTimeMin = initTime.getHours() * 60 + initTime.getMinutes();  //분단위로 변환된 값

        if (initTime.getDate() > (new Date().getDate())) {
            initTimeMin = initTime.getHours() * 60 + initTime.getMinutes() + (24 * 60); //설정 시간이 현재보다 클 경우  24시간을 더해준다.
        }
        setSelectedTime(initTimeMin);
    }, [td.timeData.settings]);

    function onClickSelectTime(e) {
        e.preventDefault();
        const timeObj = timeData(selectedTime);
        // const setSleepTime = getSetTime(timeObj.day, timeObj.hours, timeObj.minutes, 0, 0);

        const title = td.timeData.title;
        const settings = [0, timeObj.hours, timeObj.minutes, 0, 0]

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, settings })
        }

        const url = `http://localhost:9999/timeList/${td.timeData.id}`;
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                router.refresh();
                router.push(`/membership/customMenu/${res.title}`);
            })
        btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
    }

    function inputValue() {
        const test = new Date().getHours() * 60 + new Date().getMinutes();
        if (selectedTime < test) {
            return selectedTime + (24 * 60);
        } else {
            return selectedTime;
        }
    }

    function inputRange(e) {
        let rangeValue = e.target.value;
        if (rangeValue >= rangeCurrentTimeMin && rangeValue <= rangeMax) {
            setSelectedTime(Math.floor(rangeValue));
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
        <button onClick={(e) => { onClickSelectTime(e) }}>save</button >
    </>)
}