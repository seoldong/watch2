'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../logic/getTime';

export default function TomorrowMidnight() {

    const [tomorrowMid, setTomorrowMid] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            const tomorrowMidTime = getSetTime(1, 0, 0, 0, 0);
            const remainingTime = getRemainingTime(tomorrowMidTime, currentTime);
            setTomorrowMid(remainingTime);
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    return (
        <>
            {`tomorrowMid : `}
            {tomorrowMid ? `${tomorrowMid.rtHours} : ${tomorrowMid.rtMinutes} : ${tomorrowMid.rtSeconds}` : `loading...`}
        </>
    )
}