'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../logic/getTime';


export default function GuestTomorrowMid() {

    const timeSet = getSetTime(1, 0, 0, 0, 0);
    const [tomorrowMid, setTomorrowMid] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            const remainingTime = getRemainingTime(timeSet, currentTime);
            setTomorrowMid(remainingTime);
            setLoading(false);
        }, 100);
        return () => clearInterval(timer);
    }, [timeSet])

    return (
        <>
            <div>
                {`tomorrowMid : `}
                {loading ? 'loading...' :
                    `${tomorrowMid.rtHours} : ${tomorrowMid.rtMinutes} : ${tomorrowMid.rtSeconds}`}
            </div>
            <div>
                {`setting time : `}
                {loading ? 'loading...' :
                    `${timeSet.getMonth() + 1} / ${timeSet.getDate()} - ${timeSet.getHours()} : ${timeSet.getMinutes()}`}
            </div>
        </>
    )
}