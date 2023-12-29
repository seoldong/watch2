"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getRemainingTime, getSetTime, timeData } from "../../logic/getTime";
import { TimeContext } from "../../lib/guestContext";


function DisplayTime({ setBtn }) {
  const timeCon = useContext(TimeContext);
  const timeTitle = timeCon.timeTitle;
  const timeArr = timeCon.timeList[timeTitle];
  const setTingTime = getSetTime(...timeArr);
  const formatTime = (value) => String(value).padStart(2, "0");

  const [display, setDisplay] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      let selectedTime = getSetTime(...timeCon.timeList[timeTitle]);
      if (selectedTime && currentTime.getHours() >= selectedTime.getHours()) {
        selectedTime = getSetTime(
          1,
          selectedTime.getHours(),
          selectedTime.getMinutes(),
          0,
          0
        );
      }
      const remainingTime = getRemainingTime(selectedTime, currentTime);
      setDisplay(remainingTime);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeCon.timeList, timeTitle]);

  function onClickBtn() {
    setBtn.setSettingBtn(!setBtn.settingBtn);
  }

  let month = setTingTime.getMonth() + 1;
  let date = setTingTime.getDate();
  const hours = setTingTime.getHours();
  const minutes = setTingTime.getMinutes();
  const currentDate = new Date();

  if (currentDate.getHours() >= hours) {
    date = setTingTime.getDate() + 1;
  }

  return (
    <>
      <div
      className='h-1/3'
      ></div>
      <div className="h-1/3 pb-10 flex justify-center items-end tracking-wide">
        <button
          className={`p-5 text-5xl border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
          lg:text-4xl
          md:text-4xl
          sm:text-4xl
          `}
          onClick={() => setToggle(!toggle)}
        >
          <h3>
            {timeTitle}&nbsp;&nbsp;&nbsp;
            {display
              ? `${formatTime(display.rtHours)} :
                ${formatTime(display.rtMinutes)} :
                ${formatTime(display.rtSeconds)}`
              : "loading..."}
          </h3>
        </button>
      </div>

      <div
        className={`h-1/3 text-2xl flex justify-center
      lg:text-xl
      `}
      >
        <div
          className={
            toggle
              ? `h-1/2 flex justify-center duration-300`
              : `h-1/2 flex justify-center duration-300 opacity-0 translate-y-[-3rem] pointer-events-none`
          }
        >
          <div className="p-5 flex justify-end items-center tracking-wide">
            <p>
              setting time&nbsp;:&nbsp;
              {display && display.setTimeData
                ? `${formatTime(month)} /
                                ${formatTime(date)} -
                                ${formatTime(hours)} :
                                ${formatTime(minutes)}`
                : "loading..."}
            </p>
          </div>

          {timeTitle !== "tomorrowMid" ? (
            <div className="p-5 flex justify-center items-center">
              <button
                className="p-2 text-xl border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer"
                onClick={onClickBtn}
              >
                S E T T I N G
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default DisplayTime;
