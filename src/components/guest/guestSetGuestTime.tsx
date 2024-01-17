"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getSetTime, timeData } from "../../logic/getTime";
import { TimeContext } from "../../lib/guestContext";


function GuestSetGuestTime() {
  const timeContext = useContext(TimeContext); //allObj
  const timeTitle = timeContext.timeTitle; //string
  const timeList = timeContext.timeList[timeTitle]; //obj
  const timeDataRange = getSetTime(...timeList as [number, number, number, number, number]);
  const initRange = timeDataRange.getHours() * 60 + timeDataRange.getMinutes(); //number

  const [selectValue, setSelectValue] = useState(initRange);

  const settingHours = Math.floor(selectValue / 60);
  const settingMinutes = selectValue % 60;

  useEffect(() => {
    setSelectValue(initRange);
  }, [initRange]);

  const formatTime = (value) => String(value).padStart(2, "0");

  function onClickSave(e) {
    const timeObj = timeData(selectValue);
    const settings = [0, timeObj.hours, timeObj.minutes, 0, 0];
    const newDataObj = {
      ...timeContext.timeList,
      [timeTitle]: settings,
    };
    timeContext.setTimeList(newDataObj);
    timeContext.setSettingBtn(!timeContext.settingBtn);
  }

  function onClickCancel(e) {
    timeContext.setSettingBtn(!timeContext.settingBtn);
  }

  return (
      <div className="h-full flex flex-col">
        <div className='h-1/4'></div>
        <div className="h-1/4 w-full flex justify-center items-center text-3xl
              2xl:text-4xl">
            <div>{`"${timeTitle}"`} settings time :&nbsp;</div>
            <div>
              {selectValue !== null
                ? `${formatTime(settingHours)} :
                        ${formatTime(settingMinutes)}`
                : `loading...`}
            </div>
        </div>

        {timeTitle !== "tomorrowMid" ? (
          <div className="h-1/4 flex justify-center items-center">
            <div className="w-4/5">
              <input
                className="w-3/5 mx-2
                sm:w-0 sm:mx-0
                "
                type="range"
                min={0}
                max={24 * 60}
                step={30}
                value={selectValue !== null && selectValue}
                onChange={(e) => setSelectValue(Number(e.target.value))} //값 타입이 다른듯
              />
            </div>
          </div>
        ) : null}

        {timeTitle !== "tomorrowMid" ? (
          <div className="h-1/4 flex justify-center"
          >
            <div className=''>
              <button className="cursor-pointer flex justify-center border-b border-black
                      hover:border-none hover:bg-slate-400 hover:text-white font-medium
                      2xl:m-5 2xl:text-2xl
                      xl:mx-10
                      lg:mx-10
                      md:mx-10
                      sm:itmes-start sm:mx-5
                      "
                      onClick={(e) => onClickSave(e)}
              >
                <p className='p-2'>S A V E</p>
              </button>
            </div>
            <div className=''>
            <button className="cursor-pointer flex justify-center border-b border-black
                      hover:border-none hover:bg-slate-400 hover:text-white font-medium
                      2xl:m-5 2xl:text-2xl
                      xl:mx-10
                      lg:mx-10
                      md:mx-10
                      sm:itmes-start sm:mx-5
                      "
                      onClick={(e) => onClickCancel(e)}
              >
                <p className='p-2'>C A N C E L</p>
              </button>
            </div>
          </div>
        ) : null}
      </div>
  );
}

export default GuestSetGuestTime;
