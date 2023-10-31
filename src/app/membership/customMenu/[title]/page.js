'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../../../logic/getTime';
import { useParams, useRouter } from 'next/navigation';
import CustomMenuModifyPage from '../modify/page';
import Control from '../../Control';


export default function CustomMenuPage() {
  const params = useParams();
  const title = params.title;

  const [timeId, setTimeId] = useState(null);
  const [timeSettings, setTimeSettings] = useState(null);
  const [settingBtn, setSettingBtn] = useState(true);

  useEffect(() => {
    const url = 'http://localhost:9999/timeList/';
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const data = result.find((item) => { return item.title === title });
        setTimeId(data.id);
        const initSettingTime = getSetTime(...data.settings);
        setTimeSettings(initSettingTime);
      })
  }, [title]);

  return (
    <>
      {
        settingBtn ?
          <DisplayTime
            id={{ timeId, setTimeId }}
            timeSet={{ timeSettings, setTimeSettings }}
            setBtn={{ settingBtn, setSettingBtn }} />
          :
          <CustomMenuModifyPage
            id={{ timeId, setTimeId }}
            timeSet={{ timeSettings, setTimeSettings }}
            setBtn={{ settingBtn, setSettingBtn }}
            rangeMin={0}
            rangeMax={(24) * 60} />
      }
      <Control />
    </>
  )
}


function DisplayTime({ id, timeSet, setBtn }) {

  const router = useRouter();
  const params = useParams();
  const title = params.title;

  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      let selectedTime = timeSet.timeSettings;
      if (currentTime.getHours() > selectedTime.getHours()) {
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

  function onClickDelete() {
    const options = {
      method: 'DELETE',
    }
    const url = `http://localhost:9999/timeList/${id.timeId}`;
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        router.push('http://localhost:3000/membership/defaultMenu/tomorrowMid');
        router.refresh();
      })
  }

  return (
    <>
      <div>
        {`${title} : `}
        {display ?
          `${display.rtHours} : ${display.rtMinutes} : ${display.rtSeconds}` :
          `loading...`
        }
      </div>
      <div>
        {`settings time : `}
        {
          display !== null ?
            `${display.setTimeData.getHours()} : ${display.setTimeData.getMinutes()}` :
            `loading...`
        }
      </div>
      <button onClick={(e) => onClickBtn(e)}>set</button>
      <button onClick={(e) => onClickDelete(e)}>delete</button>
    </>
  )
}