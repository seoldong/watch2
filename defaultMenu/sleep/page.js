'use client'
import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../../logic/getTime';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import SetSleepPage from './modifySleep.tsx/page';
import Control from '../../../../components/Control';


function SleepPage() {
  const [selectedTimeName, setSelectedTimeName] = useState('sleep');
  const [settingTime, setSettingTime] = useState(null);
  const [settingBtn, setSettingBtn] = useState(true);

  useEffect(() => {
    const observUser = auth.onAuthStateChanged((user) => {
      if (user) {
        const checkTimeList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(db, `appUsers/${userId}/userData/timeList`);
          const userDataDocCheck = await getDoc(userDataDocRef);
          const sleepData = userDataDocCheck.get('sleep');
          const test = getSetTime(...sleepData)
          setSettingTime(test);
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
    <>
      <h3>sleep page</h3>
      {settingBtn ?
        <DisplayTime
          timeName={{ selectedTimeName, setSelectedTimeName }}
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
        /> :
        <SetSleepPage
          timeName={{ selectedTimeName, setSelectedTimeName }}
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
          rangeMin={0}
          rangeMax={(24) * 60} />}
    </>
  )
}


function DisplayTime({ timeName, timeSet, setBtn }) {
  const [display, setDisplay] = useState(null);

  const formatTime = (value) => String(value).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      let selectedTime = timeSet.settingTime;
      if (selectedTime && currentTime.getHours() > selectedTime.getHours()) {
        selectedTime = getSetTime(1, selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
      }
      const remainingTime = getRemainingTime(selectedTime, currentTime);
      setDisplay(remainingTime);
    }, 100);
    return () => { clearInterval(timer) };
  }, [timeSet, display]);

  function onClickBtn() {
    setBtn.settingBtn ? setBtn.setSettingBtn(false) : setBtn.setSettingBtn(true)
  }

  return (
    <>
      <div>
        <div>
          {`${timeName.selectedTimeName} : `}
          {display ?
            `${formatTime(display.rtHours)} : 
            ${formatTime(display.rtMinutes)} : 
            ${formatTime(display.rtSeconds)}`
            : 'loading...'}
        </div>
        <div>
          {`setting time : `}
          {display && display.setTimeData ?
            `${formatTime(display.setTimeData.getMonth() + 1)}/
            ${formatTime(display.setTimeData.getDate())} - 
            ${formatTime(display.setTimeData.getHours())} : 
            ${formatTime(display.setTimeData.getMinutes())}`
            : 'loading...'}
        </div>
        <button onClick={onClickBtn}>setting</button>
      </div>
    </>
  )
}

export default SleepPage;