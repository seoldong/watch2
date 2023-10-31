'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime, timeData } from '../../logic/getTime';

//바 조절 시 나오는 숫자 한자리 수를 두 자리수로

export default function GuestSleep({ timeName, menuArr }) {

    const [settingTime, setSettingTime] = useState(null);
    const [settingBtn, setSettingBtn] = useState(true);

    useEffect(() => {
        const timeSet = menuArr.menus.find(item => item.name === timeName.selectedTimeName)?.timeSettings; // 옵셔널 체이닝 ? 추가
        const currentHours = new Date().getHours();
        const timeSetHours = timeSet.getHours();

        if (timeSetHours < currentHours) {
            timeSet.setDate(timeSet.getDate() + 1);
        }

        setSettingTime(timeSet);
    }, [timeName, menuArr])

    return (
        <>
            {settingBtn ?
                <DisplayTime //설정값을 받고 시계를 계속 보여준다. 읽기.
                    timeName={timeName}
                    timeSet={{ settingTime, setSettingTime }}
                    menuArr={menuArr}
                    setBtn={{ settingBtn, setSettingBtn }}
                /> :
                <TimeSetting //설정값을 받아서 변경. 값을 변화시켜야 함.
                    timeName={timeName}
                    timeSet={{ settingTime, setSettingTime }}
                    menuArr={menuArr}
                    rangeMin={0}
                    rangeMax={(24) * 60}
                    setBtn={{ settingBtn, setSettingBtn }}
                />}
        </>
    )
}

export function DisplayTime({ timeName, timeSet, menuArr, setBtn }) {

    const [display, setDisplay] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            const currentTimeHours = currentTime.getHours();
            let menuTime = timeSet.settingTime;
            const menuTimeHours = menuTime.getHours();
            const menuTimeMinutes = menuTime.getMinutes();

            if (currentTimeHours > menuTimeHours) {
                menuTime = getSetTime(1, menuTimeHours, menuTimeMinutes, 0, 0);
            }

            const remainingTime = getRemainingTime(menuTime, currentTime);
            setDisplay(remainingTime);
        }, 100);
        return () => { clearInterval(timer) };
    }, [timeSet, display])

    function onClickBtn() {
        setBtn.setSettingBtn(!setBtn.settingBtn); //토글버튼 수정
    }

    return (
        <>
            <div>
                <div>{`${timeName.selectedTimeName} : `}
                    {display ? `${display.rtHours} : ${display.rtMinutes} : ${display.rtSeconds}` : `loading...`}
                </div>

                <div>
                    {`setting time : `}
                    {display ? `${display.setTimeData.getMonth() + 1} / ${display.setTimeData.getDate()} - ${display.setTimeData.getHours()} : ${display.setTimeData.getMinutes()}`
                        : `loading...`}
                </div>
                <button onClick={() => onClickBtn()}>setting</button>
            </div>
        </>
    )
}


function TimeSetting({ timeName, timeSet, menuArr, rangeMin, rangeMax, setBtn }) {

    const initCurrentDate = new Date().getDate();
    const initMenuTime = timeSet.settingTime;
    const initMenuDate = initMenuTime.getDate();
    const initMenuHours = initMenuTime.getHours();
    const initMenuMinutes = initMenuTime.getMinutes();

    let initMenuValue = initMenuHours * 60 + initMenuMinutes;

    if (initMenuDate > initCurrentDate) {
        initMenuValue = initMenuHours * 60 + initMenuMinutes + (24 * 60);
    }

    const [selectValue, setSelectValue] = useState(initMenuValue);

    const timeObj = timeData(selectValue);
    const setMenuTime = getSetTime(0, timeObj.hours, timeObj.minutes, 0, 0);


    function onClickSelectTime() {

        const updatedMenus = menuArr.menus.map(item => { //for을 map으로 수정
            if (item.name === timeName.selectedTimeName) {
                return { ...item, timeSettings: setMenuTime };
            }
            return item;
        });
        menuArr.setMenu(updatedMenus);

        setBtn.setSettingBtn(!setBtn.settingBtn);
    }

    let timeDataObj = timeData(selectValue);

    function inputRange(e) {
        let rangeValue = e.target.value;
        setSelectValue(rangeValue);
    }

    return (<>
        <div>{`${timeDataObj.day} : ${timeDataObj.hours} : ${timeDataObj.minutes}`}</div>
        <input
            type='range'
            min={rangeMin}
            max={rangeMax}
            step={30}
            value={selectValue}
            onChange={(e) => inputRange(e)}
        />
        <button onClick={() => onClickSelectTime()}>save</button >
    </>
    )
}
