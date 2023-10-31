'use client'

import { useEffect, useState } from 'react';
import { getSetTime, timeData } from '../../../../../logic/getTime';
import { useParams, useRouter } from 'next/navigation';
import Control from '../../Control';

export default function CustomMenuModifyPage({
    id,
    timeSet,
    setBtn,
    rangeMin,
    rangeMax, }) {

    const router = useRouter();
    const params = useParams();
    const title = params.title;

    const [selectValue, setSelectValue] = useState(null);

    useEffect(() => {
        let initTimeRangeValue = null;
        if (timeSet.timeSettings !== null) {
            initTimeRangeValue = timeSet.timeSettings.getHours() * 60 + timeSet.timeSettings.getMinutes()
        }
        setSelectValue(initTimeRangeValue);
    }, [timeSet])

    function onClickSelectTime(e) {
        e.preventDefault();
        const timeObj = timeData(selectValue);
        const settings = [0, timeObj.hours, timeObj.minutes, 0, 0]

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, settings })
        }

        const url = `http://localhost:9999/timeList/${id.timeId}`;
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                router.refresh();
                router.push(`/membership/customMenu/${title}`);
            })
        const newTimeSet = getSetTime(...settings);
        timeSet.setTimeSettings(newTimeSet)
        setBtn.settingBtn ? setBtn.setSettingBtn(false) : setBtn.setSettingBtn(true);
    }

    let timeDataObj = timeData(selectValue);

    return (<>
        <div>
            {`${id.timeId} settings time : `}
            {selectValue !== null ?
                `${timeDataObj.hours} :
                ${timeDataObj.minutes}` :
                `loading...`}        </div>

        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selectValue !== null && selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
        />
        <button onClick={(e) => { onClickSelectTime(e) }}>save</button >
    </>)
}