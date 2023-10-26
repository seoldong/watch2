'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../../../logic/getTime';
import Control from '../../Control';
import SleepSettings from './settings/page';


export default function SleepPage() {
  const [sleep, setSleep] = useState(null);
  const [display, setDisplay] = useState(null);
  const [setBtn, setTimeBtn] = useState(true);

  useEffect(() => {
    const url = 'http://localhost:9999/timeList/2';

    async function fetchData() {
      fetch(url)
        .then(response => response.json())
        .then(result => {

          // if(data.settings[1] < currentHours) {
          //   data.settings[0] = 1;
          // }

          const tomorrowMidSettings = getSetTime(...result.settings);
         
          setSleep(tomorrowMidSettings);
        })
    };
    fetchData();
  }, [display]);


  return (
    <>
      {setBtn ?
        <DisplayTime
          dp={{ display, setDisplay }}
          sleep={{ sleep, setSleep }}
          btn={{ setBtn, setTimeBtn }}
        /> :
        <SleepSettings
          dp={{ display, setDisplay }}
          sleep={{ sleep, setSleep }}
          btn={{ setBtn, setTimeBtn }}
        />}
      <Control />
    </>
  )
}

function DisplayTime({ dp, sleep, btn }) {

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();

      let sleepTime = sleep.sleep;

      if (sleepTime.getHours() <= currentTime.getHours()) {
          sleepTime = getSetTime(1, sleepTime.getHours(), sleepTime.getMinutes(), 0, 0);
      }

      const remainingTime = getRemainingTime(sleepTime, currentTime);
      dp.setDisplay(remainingTime);
    }, 1000);
    return () => { clearInterval(timer) };
  })

  function onClickBtn() {
    btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true)
  }

  return (
    <>
      <div>
        {dp.display ? (
          <>
            <div>
              {`sleep : ${dp.display.rtHours} : ${dp.display.rtMinutes} : ${dp.display.rtSeconds}`}
            </div>
            <div>
              {
                `setting time : ${dp.display.setTimeData.getMonth()} / ${dp.display.setTimeData.getDate()} - ${dp.display.setTimeData.getHours()} : ${dp.display.setTimeData.getMinutes()}`
              }
            </div>
          </>
        ) : (`loading...`)
        }
      </div>
      <button onClick={(e) => onClickBtn(e)}>set</button>
    </>
  )
}

//-----------------time setting-----------------
// function TimeSetting({ dp, sleep, btn }) {

//   const [selectedSleepTime, setSelectedSleepTime] = useState(0);


  
//   useEffect(() => {
//     const initDate = new Date().getDate();
//     const initSleepTime = sleep.sleep; //sleep 설정 값
//     let initSleep = initSleepTime.getHours() * 60 + initSleepTime.getMinutes();

//     if (initSleepTime.getDate() > initDate) {
//       initSleep = initSleepTime.getHours() * 60 + initSleepTime.getMinutes() + (24 * 60);
//     }
//     setSelectedSleepTime(initSleep);
//   }, [sleep])



//   function onClickSelectTime(e) {
//     e.preventDefault();
//     const timeObj = timeData(selectedSleepTime);
//     // const setSleepTime = getSetTime(timeObj.day, timeObj.hours, timeObj.minutes, 0, 0);

//     const title = e.target.value;
//     const settings = [timeObj.day, timeObj.hours, timeObj.minutes, 0, 0]

//     const options = {
//       method: 'PUT',
//       headers: { "Content-Type": "application/json", },
//       body: JSON.stringify({ title, settings })
//     }

//     const url = 'http://localhost:9999/timeList/2';
//     fetch(url, options)
//     btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true);
//   }

//   let timeDataObj = timeData(selectedSleepTime);
//   const rangeMin = 0;
//   const rangeMax = (24 + 12) * 60;
//   const rangeCurrentTime = new Date();
//   const rangeCurrentTimeMin = rangeCurrentTime.getHours() * 60 + rangeCurrentTime.getMinutes();

//   function inputRange(e) {
//     let rangeValue = e.target.value;
//     if (rangeValue >= rangeCurrentTimeMin && rangeValue <= rangeMax) {
//       setSelectedSleepTime(Math.floor(rangeValue));
//     }
//   }

//   return (<>
//     <div>
//       {timeDataObj !== null ? `${timeDataObj.day === 0 ? 'today' : 'tomorrow'} : ${timeDataObj.hours} : ${timeDataObj.minutes}` : `loading...`}
//     </div>

//     <input
//       type='range'
//       min={rangeMin}
//       max={rangeMax}
//       step={30}
//       value={selectedSleepTime}
//       onChange={(e) => inputRange(e)}
//     />
//     <button value={'sleep'} onClick={(e) => { onClickSelectTime(e) }}>save</button >
//   </>)
// }


// function timeData(selectedSleepTime) {
//   let day = 0;
//   let hours = Math.floor(selectedSleepTime / 60);
//   const minutes = Math.floor(selectedSleepTime % 60);
//   if (hours >= 24) {
//     hours = Math.floor(selectedSleepTime / 60 - 24);
//     day = 1;
//   }
//   return { day, hours, minutes, }
// }

