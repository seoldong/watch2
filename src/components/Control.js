'use client'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase-config';


function Control() {
    const [timeList, setTimeList] = useState([]);

    useEffect(() => {
        const observUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                const checkTimeList = async () => {
                    const userId = user.uid;
                    const userDataDocRef = doc(db, `appUsers/${userId}/userData/timeList`);
                    const userDataDocCheck = await getDoc(userDataDocRef);

                    if (userDataDocCheck.exists()) {
                        const userTimeData = userDataDocCheck.data();
                        const timeListKeys = Object.keys(userTimeData);
                        const timeListKeysSort = timeListKeys.sort();

                        let timeListArr = [];
                        for (let i = 0; i < timeListKeysSort.length; i++) {
                            const obj = {
                                title: timeListKeys[i],
                                value: userTimeData[timeListKeys[i]],
                                id: i,
                            }
                            timeListArr.push(obj);
                        }
                        setTimeList(timeListArr);
                    }
                    else {
                        const defaultTime = {
                            tomorrowMid: 2400,
                            sleep: 2300,
                        }
                        await setDoc(userDataDocRef, defaultTime);
                        const initTimeList = [
                            {
                                title: 'tomorrowMid',
                                value: [0, 24, 0, 0, 0],
                            },
                            {
                                title: 'sleep',
                                value: [0, 23, 0, 0, 0],
                            },
                        ]
                        setTimeList(initTimeList);
                    }
                }
                checkTimeList();
            }
            else {
                console.log('user is not signed in');
            }
        })
        return () => { observUser() }
    }, [])

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            className='flex justify-center items-center'
        >
            <ul
                style={{ height: '100%' }}
                className='flex flex-wrap'
            >
                {timeList.map((time) => {
                    return (
                        <Link
                            style={{ height: '10rem', width: '10rem' }}
                            className="m-2 p-2 flex flex-col justify-center items-center underline underline-offset-8 border border-slate-200 hover:border-none hover:bg-slate-400 hover:text-white font-medium leading-10"
                            href={`/membership/customMenu/${time.title}`}
                            key={time.title}
                        >
                            {time.title}
                        </Link>
                    )
                })}
                <div
                    style={{ height: '10rem', width: '10rem' }}
                    className="flex m-2 justify-center items-center"
                >
                    {timeList.length <= 9 ?
                        <Link
                            style={{ height: '100%', width: '100%' }}
                            className="m-2 p-2 flex flex-col justify-center items-center underline underline-offset-8 border border-slate-200 hover:border-none hover:bg-slate-400 hover:text-white font-medium leading-10"
                            href={'/membership/customMenu/add'}>
                            add
                        </Link> : null}
                </div>
            </ul>
        </ div>
    )
}

export default Control;