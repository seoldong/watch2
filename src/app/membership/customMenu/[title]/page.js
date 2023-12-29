'use client'

import { useEffect, useState } from 'react';
import { auth, db } from '../../../../lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { getRemainingTime, getSetTime } from '../../../../logic/getTime';
import { useParams } from 'next/navigation';
import Control from '../../../../components/Control';
import CustomMenuModifyPage from '../modify/page';


function CustomPage() {
  const params = useParams();
  const title = params.title;

  const [settingTime, setSettingTime] = useState(null);
  const [settingBtn, setSettingBtn] = useState(true);




  useEffect(() => {
    const observUser = auth.onAuthStateChanged((user) => {
      if (user) {
        const checkTimeList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(db, `appUsers/${userId}/userData/timeList`);
          const userDataDocCheck = await getDoc(userDataDocRef);
          const timeData = userDataDocCheck.get(title);

          const test = getSetTime(...timeData)
          setSettingTime(test);
        }
        checkTimeList();
      }
      else {
        console.log('user is not signed in');
      }
    })

    return () => { observUser() }
  }, [title])

  return (
    <>
      {settingBtn ?
        <DisplayTime
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
        /> :
        <CustomMenuModifyPage
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
          rangeMin={0}
          rangeMax={(24) * 60} />}
    </>
  )
}


function DisplayTime({ timeSet, setBtn }) {
  const parpam = useParams();
  const title = parpam.title;
  const formatTime = (value) => String(value).padStart(2, '0');

  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      let selectedTime = timeSet.settingTime;
      if (selectedTime && currentTime.getHours() >= selectedTime.getHours()) {
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
    <div
      style={{ height: '100%', width: '100%' }}
    >

      <div
        style={{ height: '50%' }}
      >
        <h3
          style={{ height: "50%" }}
          className='flex justify-center items-center text-3xl tracking-wide'
        >{title}&nbsp;-&nbsp;{display ?
          `${formatTime(display.rtHours)} :
                ${formatTime(display.rtMinutes)} :
                ${formatTime(display.rtSeconds)}`
          : 'loading...'}
        </h3>

        <div
          style={{ height: "50%" }}
          className="flex justify-center"
        >
          <div
            style={{ height: '50%' }}
            className='flex justify-center items-center'
          >
            <div
              style={{ height: '50%' }}
              className="flex justify-end items-center text-xl tracking-wide"
            >
              <div className="m-2">{`setting time : `}</div>
              <div>
                {display && display.setTimeData ?
                  `${formatTime(display.setTimeData.getMonth() + 1)} /
                      ${formatTime(display.setTimeData.getDate())} -
                      ${formatTime(display.setTimeData.getHours())} :
                      ${formatTime(display.setTimeData.getMinutes())}`
                  : 'loading...'}
              </div>
            </div>
            <button
              style={{ height: "60%", width: "10rem" }}
              className="mx-5 cursor-pointer underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium tracking-wide"
              onClick={onClickBtn}
            >
              S E T T I N G
            </button>
          </div>
        </div>

      </div>


      <div
        style={{ height: '50%' }}
      >
        <Control />
      </div>

    </div>
  )
}

export default CustomPage;