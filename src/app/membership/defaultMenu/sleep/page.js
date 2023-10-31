'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../../../logic/getTime';
import SleepSettingsPage from './settings/page';
import Control from '../../Control';


export default function SleepPage() {
  const [timeName, setTimeName] = useState(null);
  const [timeSettings, setTimeSettings] = useState(null);
  const [settingBtn, setSettingBtn] = useState(true);

  useEffect(() => {
    const url = 'http://localhost:9999/timeList/2';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTimeName(data.title);
        const initSettingTime = getSetTime(...data.settings);
        setTimeSettings(initSettingTime);
      })
  }, []);

  return (
    <>
      {
        settingBtn ?
          <DisplayTime
            name={{ timeName, setTimeName }}
            timeSet={{ timeSettings, setTimeSettings }}
            setBtn={{ settingBtn, setSettingBtn }} />
          :
          <SleepSettingsPage
            name={{ timeName, setTimeName }}
            timeSet={{ timeSettings, setTimeSettings }}
            setBtn={{ settingBtn, setSettingBtn }}
            rangeMin={0}
            rangeMax={(24) * 60} />
      }
    </>
  )
}


function DisplayTime({ name, timeSet, setBtn }) {
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

  return (
    <>
      <div>
        {`sleep time : `}
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
      <Control />
    </>
  )
}
