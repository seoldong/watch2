"use client";
import { useEffect, useState } from "react";
import { getRemainingTime, getSetTime } from "../../../logic/getTime";
import Control from "../../../components/Control";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase-config";

interface remainingDate {
  rtHours: number;
  rtMinutes: number;
  rtSeconds: number;
  setTimeData: Date;
}

function CustomMenuPage() {
  const router = useRouter();
  const formatTime = (value: number): string => String(value).padStart(2, "0");

  const [tomorrowMid, setTomorrowMid] = useState<remainingDate | undefined>();
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const checkSignIn = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("membership > custommenu : no signIn and push to /");
        await signOut(auth);
        router.push("/");
      }
    });
    return () => checkSignIn();
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const tomorrowMid = getSetTime(1, 0, 0, 0, 0);
      const remainingTime:remainingDate = getRemainingTime(tomorrowMid, currentTime);
      setTomorrowMid(remainingTime);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [router]);

  return (
    <div className="h-full w-full">
      <div className="h-1/2 w-full flex-col">
        <div className="h-1/3"></div>
        <div className="h-1/3 pb-10 flex justify-center items-end tracking-wide">
          <button
            className={`
            text-5xl border-b border-black
            hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
            lg:text-4xl
            md:text-4xl
            sm:text-4xl
            `}
            onClick={() => setToggle(!toggle)}
          >
            <h3 className="p-5">
              midnight&nbsp;-&nbsp;
              {tomorrowMid
                ? `${formatTime(tomorrowMid.rtHours)} :
                 ${formatTime(tomorrowMid.rtMinutes)} :
                 ${formatTime(tomorrowMid.rtSeconds)}`
                : "loading..."}
            </h3>
          </button>
        </div>

        {/*  */}

        <div className="h-1/3 text-2xl flex justify-center
             xl:text-xl
             lg:text-xl
             sm:text-xl
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
              p-5 flex justify-end items-center tracking-widest
              "
            >
              <p>setting midnight&nbsp;:&nbsp;00 : 00 : 00</p>
            </div>
          </div>
          {/*  */}
        </div>
      </div>

      {/*  */}

      <Control />
    </div>
  );
}

export default CustomMenuPage;
