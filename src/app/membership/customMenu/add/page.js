'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime, timeData } from '../../../../../logic/getTime';
import Control from '../../Control';
import { useRouter } from 'next/navigation';

//빈값 타이틀 처리
//중복 타이틀 처리
//10개 넘을 시 처리
//useParams ?
//useRouter ?

//불러온 설정 값이 현재 시간보다 작을 경우 > 다음날로 설정
// > 이건 초기 값 받을 때 해야할 것 같은데
// > 자정이 되면 날짜 초기 데이터 날짜 바꾸기
// > 새로 추가하는 날짜는 바 이동이 자유로워야 할듯? 아닌가?

export default function CustomAddPage() {

    const router = useRouter();

    const [selectedTime, setSelectTime] = useState(0);

    let timeDataObj = timeData(selectedTime);
    const rangeMin = 0;
    const rangeMax = (23.5) * 60;

    return (<>
        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const time = selectedTime;
            const settingValue = timeData(time);

            const settings = [0, settingValue.hours, settingValue.minutes, 0, 0];
            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ title, settings })
            }
            const url = 'http://localhost:9999/timeList';

            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    const lastTitle = data.title;
                    router.refresh();
                    router.push(`/membership/customMenu/${lastTitle}`);
                })
        }}>
            <div>
                <input type='text' name='title' placeholder='title'></input>
            </div>

            <div>
                {timeDataObj !== null ? `${timeDataObj.day} : ${timeDataObj.hours} : ${timeDataObj.minutes}` : `loading...`}
            </div>

            <div>
                <input
                    type='range'
                    min={rangeMin}
                    max={rangeMax}
                    step={30}
                    value={selectedTime}
                    onChange={(e) => setSelectTime(e.target.value)}
                />
            </div>

            <input type='submit' value={'create'}></input >
        </form>
        <Control />
    </>)
}