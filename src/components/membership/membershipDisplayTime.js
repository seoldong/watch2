"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRemainingTime, getSetTime } from "../../logic/getTime";
import Control from "../Control";

function MembershipDisplayTime({ timeSet, setBtn }) {
  const parpam = useParams();
  const title = parpam.title;
  const formatTime = (value) => String(value).padStart(2, "0");

  const [display, setDisplay] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      let selectedTime = timeSet.settingTime;
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
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [timeSet, display]);

  function onClickBtn() {
    setBtn.settingBtn
      ? setBtn.setSettingBtn(false)
      : setBtn.setSettingBtn(true);
  }

  return (
    <div className='h-full w-full' >
      <div className="h-1/2 w-full flex-col" >
        <div className="h-1/3"></div>
        <div className="h-1/3 pb-10 flex justify-center items-end">
          <button
            className={`
            border-b border-black
            hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
            2xl:text-4xl
            xl:text-4xl
            lg:text-4xl
            md:text-4xl
            sm:text-4xl
            `}
            onClick={() => setToggle(!toggle)}
          >
            <h3 className="p-5">
              {title}&nbsp;-&nbsp;&nbsp;
              {display
                ? `${formatTime(display.rtHours)} :
                   ${formatTime(display.rtMinutes)} :
                   ${formatTime(display.rtSeconds)}`
                : "loading..."}
            </h3>
          </button>
        </div>

        {/*  */}

        <div className="h-1/3 text-2xl flex justify-center
             lg:text-xl
             "
        >
          <div
            className={`
              ${toggle
                ? `h-1/2 flex justify-center duration-300`
                : `h-1/2 flex justify-center duration-300 opacity-0 translate-y-[-3rem] pointer-events-none`}
                sm:flex-col
                `}
          >
            <div
              className="
              p-5 flex justify-end items-center tracking-wide
              "
            >
              <p>setting time&nbsp;:&nbsp;
                {display && display.setTimeData
                  ? `${formatTime(display.setTimeData.getMonth() + 1)} /
                          ${formatTime(display.setTimeData.getDate())} -
                          ${formatTime(display.setTimeData.getHours())} :
                          ${formatTime(display.setTimeData.getMinutes())}`
                  : "loading..."}
              </p>
            </div>

            {/*  */}

            <div
              className="
              p-5 flex justify-center items-center
              sm:p-0
              "
            >
              <button
                className="p-2 text-xl border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer"
                onClick={onClickBtn}
              >
                S E T T I N G
              </button>
            </div>
          </div>
        </div>
      </div>

        <Control />
    </div>
  );
}

export default MembershipDisplayTime;
