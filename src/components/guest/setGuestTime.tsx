"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getSetTime, timeData } from "../../logic/getTime";
import { TimeContext } from "../../lib/guestContext";

function SetGuestTime({ setBtn }) {
  const timeContext = useContext(TimeContext); //allObj
  const timeTitle = timeContext.timeTitle; //string
  const timeList = timeContext.timeList[timeTitle]; //obj
  const timeDataRange = getSetTime(...timeList);
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
    setBtn.setSettingBtn(!setBtn.settingBtn);
  }

  function onClickCancel(e) {
    setBtn.setSettingBtn(!setBtn.settingBtn);
  }

  return (
    <>
      <div
        style={{ height: "40%" }}
        className="flex justify-center items-center text-5xl tracking-wide"
      >
        <h3>{timeTitle} settings Page</h3>
      </div>

      <div style={{ height: "60%" }} className="flex flex-col">
        <div style={{ height: "30%" }} className="flex justify-center">
          <div className="mb-5 flex items-end text-xl">
            <div>settings time :&nbsp;</div>
            <div>
              {selectValue !== null
                ? `${formatTime(settingHours)} :
                        ${formatTime(settingMinutes)}`
                : `loading...`}
            </div>
          </div>
        </div>

        {timeTitle !== "tomorrowMid" ? (
          <div
            style={{ height: "30%" }}
            className="flex justify-center items-center"
          >
            <div
              style={{ width: "50%" }}
              className="flex justify-center items-center"
            >
              <input
                className="w-3/5 mx-2"
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
          <div
            style={{ height: "40%" }}
            className="my-5 flex justify-center items-start"
          >
            <button
              style={{ height: "3rem", width: "8rem" }}
              className="mx-5 cursor-pointer underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              onClick={(e) => onClickSave(e)}
            >
              S A V E
            </button>
            <button
              style={{ height: "3rem", width: "8rem" }}
              className="mx-5 cursor-pointer underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              onClick={(e) => onClickCancel(e)}
            >
              C A N C E L
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SetGuestTime;
