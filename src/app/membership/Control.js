'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Control() {

    const [timeList, setTimeList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/timeList', { cache: "no-store" })
            .then((res) => res.json())
            .then(resulte => setTimeList(resulte));
    }, []);

    return (
        <>
            <ol>
                {timeList.map((time) => {
                    return (
                        <li key={time.id}>
                            <Link href={time.title === 'tomorrowMid' || time.title === 'sleep'
                                ? `/membership/defaultMenu/${time.title}`
                                : `/membership/customMenu/${time.title}`}>
                                {time.title}
                            </Link>
                        </li>
                    )})}
                <Link href={'/membership/customMenu/add'}>add</Link>
            </ol>
        </>
    )

}
