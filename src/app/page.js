"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TimeContext } from "../lib/guestContext";
import GuestDisplayTime from "../components/guest/guestDisplayTime";
import GuestSetGuestTime from "../components/guest/guestSetGuestTime";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase-config";

export default function HomePage() {
  const router = useRouter();

  const initTimeList = {
    midnight: [0, 0, 0, 0, 0],
    sleep: [0, 23, 0, 0, 0],
    breakfast: [0, 7, 0, 0, 0],
    lunch: [0, 12, 0, 0, 0],
    dinner: [0, 18, 0, 0, 0],
  };

  const [timeTitle, setTimeTitle] = useState("midnight");
  const [timeList, setTimeList] = useState(initTimeList);
  const [settingBtn, setSettingBtn] = useState(true);

  useEffect(() => {
    const checkSignState = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("guest home : signIn")
        router.push("/membership/customMenu");
      }
      else {
        console.log("guest home : no signIn")
      }
    });
    return () => checkSignState();
  }, [router]);

  return (
    <div className="h-full w-full">
      <div className="h-1/2 w-full flex-col">
        <TimeContext.Provider
          value={{ timeTitle, setTimeTitle, timeList, setTimeList }}
        >
          {settingBtn ? (
            <GuestDisplayTime setBtn={{ settingBtn, setSettingBtn }} />
          ) : (
            <GuestSetGuestTime setBtn={{ settingBtn, setSettingBtn }} />
          )}
        </TimeContext.Provider>
      </div>

      {/*  */}

      <div className="h-1/2 w-full pt-5 flex flex-col items-center">
        <div className="w-5/6 flex flex-wrap
          2xl:w-5/6 2xl:flex-wrap 2xl:justify-between 2xl:items-center 2xl:text-xl
          xl:w-5/6 xl:flex-wrap xl:justify-between xl:items-center xl:text-lg
          lg:w-5/6 lg:flex-wrap lg:justify-between lg:items-center
          md:w-5/6 md:flex-wrap md:justify-between md:items-center md:text-lg
          sm:w-5/6 sm:flex-wrap sm:justify-between sm:items-center sm:text-lg
          "
        >
          <div className="m-3 flex justify-center items-center border
            2xl:h-[14rem] 2xl:w-[14rem]
            xl:h-[12rem] xl:w-[12rem] xl:m-0
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button className="h-full w-full p-2 border border-slate-400
                    hover:border-none hover:bg-slate-400 hover:text-white"
                    onClick={() => setTimeTitle("midnight")}
            >
              <span className='p-2 border-b border-black tracking-widest'>MIDNIGHT</span>
            </button>
          </div>

          <div className="m-3 flex justify-center items-center border
            2xl:h-[14rem] 2xl:w-[14rem]
            xl:h-[12rem] xl:w-[12rem] xl:m-0
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className="h-full w-full p-2 border border-slate-400
              hover:border-none hover:bg-slate-400 hover:text-white"
              onClick={() => setTimeTitle("sleep")}
            >
              <span className='p-2 border-b border-black tracking-widest'>SLEEP</span>
            </button>
          </div>

          <div className="m-3 flex justify-center items-center border
            2xl:h-[14rem] 2xl:w-[14rem]
            xl:h-[12rem] xl:w-[12rem] xl:m-0
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className="h-full w-full p-2 border border-slate-400
              hover:border-none hover:bg-slate-400 hover:text-white"
              onClick={() => setTimeTitle("breakfast")}
            >
              <span className='p-2 border-b border-black tracking-widest'>BREAKFAST</span>
            </button>
          </div>

          <div className="m-3 flex justify-center items-center border
            2xl:h-[14rem] 2xl:w-[14rem]
            xl:h-[12rem] xl:w-[12rem] xl:m-0
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className="h-full w-full p-2 border border-slate-400
              hover:border-none hover:bg-slate-400 hover:text-white"
              onClick={() => setTimeTitle("lunch")}
            >
              <span className='p-2 border-b border-black tracking-widest'>LUNCH</span>
            </button>
          </div>

          <div className="m-3 flex justify-center items-center border
            2xl:h-[14rem] 2xl:w-[14rem]
            xl:h-[12rem] xl:w-[12rem] xl:m-0
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className="h-full w-full p-2 border border-slate-400
              hover:border-none hover:bg-slate-400 hover:text-white"
              onClick={() => setTimeTitle("dinner")}
            >
              <span className='p-2 border-b border-black tracking-widest'>DINNER</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
