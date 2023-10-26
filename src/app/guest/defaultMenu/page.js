'use client'

import { useState } from 'react';
import DefaultMenu from '../../../../component/guest/defaultMenu';
import TomorrowMid from '../../../../component/guest/tomorrowMid';
import Sleep from '../../../../component/guest/sleep';
import Breakfast from '../../../../component/guest/breakfast';
import Lunch from '../../../../component/guest/lunch';
import Dinner from '../../../../component/guest/dinner';
import { getSetTime } from '../../../../logic/getTime';

export default function GuestPage() {

    const initMenu = 'tomorrowMid';
    const [selectedMenu, setSelectedMenu] = useState(initMenu);

    const initSleepTime = getSetTime(0, 23, 0, 0, 0);
    const [sleepState, setSleepState] = useState(initSleepTime)

    const initBreakfast = getSetTime(0, 7, 30, 0, 0);
    const [breakfastState, setBreakfastState] = useState(initBreakfast);

    const initLunch = getSetTime(0, 12, 0, 0, 0);
    const [lunchState, setLunchState] = useState(initLunch);

    const initDinner = getSetTime(0, 18, 0, 0, 0);
    const [dinnerState, setDinnerState] = useState(initDinner);


    function displayMenu() {
        switch (selectedMenu) {
            case 'tomorrowMid':
                return <TomorrowMid />
            case 'sleep':
                return <Sleep sleep={{ sleepState, setSleepState }} />
            case 'breakfast':
                return <Breakfast breakfast={{ breakfastState, setBreakfastState }} />
            case 'lunch':
                return <Lunch lunch={{ lunchState, setLunchState }} />
            case 'dinner':
                return <Dinner dinner={{ dinnerState, setDinnerState }} />
        }
    }

    return (
        <>
            <div>{displayMenu()}</div>
            <div>
                <DefaultMenu menu={{ selectedMenu, setSelectedMenu }} />
            </div>
        </>
    )
}