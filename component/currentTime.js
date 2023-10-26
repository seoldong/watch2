'use client'

import { useEffect, useState } from 'react'

export default function CurrentTime() {

    //초기값 렌더링 오류가 있는 것 같아 주석처리

    // const initCurrent = new Date();
    // const initHours = initCurrent.getHours();
    // const initMinutes = initCurrent.getMinutes();
    // const initSeconds = initCurrent.getSeconds();
    // const initTimeObj = {
    //     hours: initHours,
    //     minutes: initMinutes,
    //     seconds: initSeconds
    // };

    const [currenTime, setCurrentTime] = useState();

    useEffect(() => {
        const timer = setInterval(() => {
            const current = new Date();
            const hours = current.getHours();
            const minutes = current.getMinutes();
            const seconds = current.getSeconds();
            const timeObj = {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };

            setCurrentTime(timeObj);
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    return (
        <>
            {currenTime ? `${currenTime.hours} : ${currenTime.minutes} : ${currenTime.seconds}` : 'loading...'}
        </>
    )
}