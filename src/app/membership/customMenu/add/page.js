'use client'
import { useEffect, useState } from 'react';
import { timeData } from '../../../../logic/getTime';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../lib/firebase-config';


export default function CustomAddPage() {
    const params = useParams();
    const title = params.title;
    const router = useRouter();
    const formatTime = (value) => String(value).padStart(2, '0');

    const [timeTitle, setTimeTitle] = useState('');
    const [selectedTime, setSelectTime] = useState(0);
    const [timeTitleList, setTimeTitleList] = useState([]);

    useEffect(() => {
        const observUser = auth.onAuthStateChanged((user) => {
            if (user) {
                const checkList = async () => {
                    const userId = user.uid;
                    const userDataDocRef = doc(db, `appUsers/${userId}/userData/timeList`);
                    const userTimeList = (await getDoc(userDataDocRef)).data();
                    const userTimeTitleList = Object.keys(userTimeList);
                    setTimeTitleList(userTimeTitleList);
                }
                checkList();
            }
            else {
                console.log('user is not signed in');
            }
        })
        return () => { observUser() }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (timeTitleList.includes(title)) {
            return alert('이미 존재하는 타이틀입니다.');
        }

        const settingTime = timeData(selectedTime);
        const newTime = [0, settingTime.hours, settingTime.minutes, 0, 0];

        const upDataTime = async () => {
            const userId = auth.currentUser.uid;
            const timeListPath = `appUsers/${userId}/userData/timeList`;
            const userDataDocRef = doc(db, timeListPath);
            const newTimeData = { [timeTitle]: newTime };
            const updateData = await updateDoc(userDataDocRef, newTimeData)
            router.push(`/membership/customMenu`)

        };
        upDataTime();
    };

    function onClickCancel(e) {
        router.push(`/membership/customMenu`)
    }

    const dpTimeValue = timeData(selectedTime);

    const handleTitleChange = (e) => {
        const inputValue = e.target.value.trim();
        const formattedValue = inputValue.replace(/\s/g, '_');
        const truncatedValue = formattedValue.slice(0, 12);
        if (truncatedValue.length === 0) {
            alert('텍스트를 입력하세요.');
        } else {
            setTimeTitle(truncatedValue);
        }
    }

    return (
        <div
            style={{ height: '80%', width: '60%' }}
            className='flex flex-col items-center'
        >
            <div
                style={{ height: '20%', width: '100%' }}
                className='flex justify-center items-center text-3xl'
            >A D D_T I M E _ S E T T I N G
            </div>
            <div
                style={{ height: '80%', width: '100%' }}
                className=''
            >
                <form
                    style={{ height: '70%' }}
                    className='flex flex-col'
                    onSubmit={handleSubmit}>

                    <div
                        style={{ height: '30%', width: '100%' }}
                        className='flex justify-center items-center tracking-wide'
                    >
                        <div
                            style={{ height: '100%', width: '80%' }}
                            className='flex items-center'
                        >
                            <label
                                style={{ height: '3rem', width: '50%' }}
                                className='pr-10 flex justify-end items-center'
                                htmlFor='timeTitle'>T I M E _ T I T L E :</label>
                            <input
                                style={{ height: '3rem', width: '50%' }}
                                className='p-2 flex justify-center items-center outline-none border-b-2 focus:border-black'
                                type='text'
                                id='timeTitle'
                                placeholder='" only text "'
                                // onChange={(e) => setTimeTitle(e.target.value)}
                                onChange={handleTitleChange}
                            />
                        </div>
                    </div>

                    <div
                        style={{ height: '70%', width: '100%' }}
                        className='flex flex-col items-center tracking-wide'
                    >
                        <div
                            style={{ height: '40%', width: '80%' }}
                            className='flex justify-center items-center'
                        >
                            <label
                                style={{ height: '3rem', width: '50%' }}
                                className='pr-10 flex justify-end items-center'
                                htmlFor='timeLangth'>
                                <p>S E T _ T I M E :</p>
                            </label>
                            {dpTimeValue !== null ?
                                <div
                                    style={{ height: '3rem', width: '50%' }}
                                    className='p-2 flex items-center text-xl'
                                >{formatTime(dpTimeValue.hours)} : {formatTime(dpTimeValue.minutes)}</div> : `loading...`}
                        </div>

                        <div
                            style={{ height: '60%', width: '100%' }}
                            className='pt-5 flex justify-center items-cneter'
                        >
                            <input
                                style={{ height: '50%', width: '80%' }}
                                className=''
                                id='timeLangth'
                                type='range'
                                min={0}
                                max={(23.5) * 60}
                                step={30}
                                value={selectedTime}
                                onChange={(e) => setSelectTime(e.target.value)}
                            />
                        </div>
                    </div>

                </form >
                <div
                    style={{ height: '30%' }}
                    className='flex border border-gray-400'
                >
                    <div
                        style={{ height: '100%', width: '100%' }}
                        className='flex justify-center items-center'
                    >
                        <button
                            style={{ height: "3rem", width: "8rem" }}
                            className="m-2 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
                            type='submit'
                            onClick={(e) => handleSubmit(e)}
                        >
                            C R E A T E
                        </button>
                        <button
                            style={{ height: "3rem", width: "8rem" }}
                            className="m-2 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
                            onClick={(e) => onClickCancel(e)}
                        >
                            C A N C E L
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}