'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../../../logic/getTime';
import Control from '../../Control';
import { useParams, useRouter } from 'next/navigation';
import CustomMenuModifyPage from '../modify/page';


export default function CustomMenuPage() {

    const router = useRouter();
    const params = useParams();
    const title = params.title;

  const [timeData, setTimeData] = useState({title:"", settings:[0,0,0,0,0]}); // db에서 가져온 시간 데이터 {title, settings}

  const [display, setDisplay] = useState(null); // 화면에 표시할 시간 데이터 {rtHours, rtMinutes, rtSeconds, setTimeData}
  const [setBtn, setTimeBtn] = useState(true); // 시간 설정 버튼

  useEffect(() => {
    const url = 'http://localhost:9999/timeList/';
      fetch(url)
        .then(response => response.json())
        .then(result => {
          const data = result.find((item) => { return item.title === title });
          const currentHours = new Date().getHours();

          if(data.settings[1] < currentHours) {
            data.settings[0] = 1;
          }

          setTimeData(data, display);
        //   const tomorrowMidSettings = getSetTime(...result.settings);
        //   setSleep(tomorrowMidSettings);
        })
  }, [title, display]);

  return (
    <>
      {setBtn ?
        <DisplayTime
          dp={{ display, setDisplay }}
          td={{ timeData, setTimeData }}
          btn={{ setBtn, setTimeBtn }}
        /> :
        <CustomMenuModifyPage
          dp={{ display, setDisplay }}
          td={{ timeData, setTimeData }}
          btn={{ setBtn, setTimeBtn }}
        />}
      <Control />
    </>
  )
}

function DisplayTime({ dp, td, btn }) {

  const router = useRouter();
  const params = useParams();
  const title = params.title;

  useEffect(() => {
    const timer = setInterval(() => {
      const settingTime = getSetTime(...td.timeData.settings);
      const currentTime = new Date();
      const remainingTime = getRemainingTime(settingTime, currentTime);
      dp.setDisplay(remainingTime);
    }, 1000);
    return () => { clearInterval(timer) };
  })

  function onClickBtn() {
    btn.setBtn ? btn.setTimeBtn(false) : btn.setTimeBtn(true)
  }

  function onClickDelete() {
    const options = {
      method: 'DELETE',
    }
    const url = `http://localhost:9999/timeList/${td.timeData.id}`;
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        router.push('http://localhost:3000/membership');
        router.refresh();
      })
  }

  return (
    <>
      <div>
        {dp.display ? (
          <>
            <div>
              {`${title} : ${dp.display.rtHours} : ${dp.display.rtMinutes} : ${dp.display.rtSeconds}`}
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
      <button onClick={(e) => onClickBtn(e)}>set 123</button>
      <button onClick={(e) => onClickDelete(e)}>delete</button>

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