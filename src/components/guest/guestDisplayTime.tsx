"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getRemainingTime, getSetTime, timeData } from "../../logic/getTime";
import { TimeContext } from "../../lib/guestContext";


function GuestDisplayTime({ setBtn }) {
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
      <div className="h-1/3"></div>
      <div className="h-1/3 flex justify-center items-center">
        <button className={`p-5 text-5xl border-b border-black
                hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
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
      <div className="h-1/3 text-2xl flex justify-center items-start
          lg:text-xl
          "
          >
        <div className={`
            ${toggle
              ? `flex justify-center duration-300`
              : `flex justify-center duration-300 opacity-0 translate-y-[-3rem] pointer-events-none`}
              lg:flex-col
              md:flex-col
              sm:flex-col
              `}
        >
          <div className="pb-5 flex justify-end items-center tracking-wide
                2xl:pb-0          
                xl:pb-0
                sm:text-lg
                ">
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

          {/*  */}

          {timeTitle !== "midnight" ? (
            <div
              className="p-5 flex justify-center items-center
              2xl:mx-5
              xl:mx-5
              md:p-5
              sm:p-0         
              ">
              <button className="p-2 text-xl border-b border-black cursor-pointer
                      hover:border-none hover:bg-slate-400 hover:text-white
                      sm:p-2 sm:text-lg
                      "
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

export default GuestDisplayTime;
