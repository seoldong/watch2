'use client'
import { useEffect, useState } from 'react';
import { getSetTime, timeData } from '../../../../../../logic/getTime';
import Control from '@/app/membership/Control';

export default function SleepSettingsPage({
    name,
    timeSet,
    setBtn,
    rangeMin,
    rangeMax, }) {

    const [selectValue, setSelectValue] = useState(null);

    useEffect(() => {
        let initTimeRangeValue = null;
        if (timeSet.timeSettings !== null) {
            initTimeRangeValue = timeSet.timeSettings.getHours() * 60 + timeSet.timeSettings.getMinutes()
        }
        setSelectValue(initTimeRangeValue);
    }, [timeSet])


    function onClickSaveTime(e) {
        e.preventDefault();
        const timeObj = timeData(selectValue);
        const title = name.timeName;
        const settings = [0, timeObj.hours, timeObj.minutes, 0, 0]

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, settings })
        }
        const url = 'http://localhost:9999/timeList/2';
        fetch(url, options)

        const newTimeSet = getSetTime(...settings);
        timeSet.setTimeSettings(newTimeSet)
        setBtn.settingBtn ? setBtn.setSettingBtn(false) : setBtn.setSettingBtn(true);
    }

    let timeDataObj = timeData(selectValue);

    return (<>
        <div>
            {`${name.timeName} settings time : `}
            {selectValue !== null ?
                `${timeDataObj.hours} :
                ${timeDataObj.minutes}` :
                `loading...`}
        </div>

        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selectValue !== null && selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
        />
        <button value={'sleep'} onClick={(e) => { onClickSaveTime(e) }}>save</button >
        <Control />
    </>)
}