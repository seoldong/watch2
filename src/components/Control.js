"use client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase-config";

function Control() {
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    const observUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkTimeList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(db,`appUsers/${userId}/userData/timeList`);
          const userDataDocCheck = await getDoc(userDataDocRef);

          if (userDataDocCheck.exists()) {
            const userTimeData = userDataDocCheck.data();
            const timeListKeys = Object.keys(userTimeData);
            const timeListKeysSort = timeListKeys.sort();

            let timeListArr = [];
            for (let i = 0; i < timeListKeysSort.length; i++) {
              const obj = {
                title: timeListKeys[i],
                value: userTimeData[timeListKeys[i]],
                id: i,
              };
              timeListArr.push(obj);
            }
            setTimeList(timeListArr);
          } else {
            const defaultTime = {
              tomorrowMid: 2400,
              sleep: 2300,
            };
            await setDoc(userDataDocRef, defaultTime);
            const initTimeList = [
              {
                title: "tomorrowMid",
                value: [0, 24, 0, 0, 0],
              },
              {
                title: "sleep",
                value: [0, 23, 0, 0, 0],
              },
            ];
            setTimeList(initTimeList);
          }
        };
        checkTimeList();
      } else {
        console.log("Control Component : user is not signed in");
      }
    });
    return () => {
      observUser();
    };
  }, []);

  return (
    <div
      className="
        h-1/2 w-full flex flex-col items-center
        "
    >
      <ul
        className="w-5/6 flex flex-wrap
          2xl:w-5/6 2xl:flex-wrap 2xl:justify-between 2xl:items-center 2xl:text-xl
          xl:w-5/6 xl:flex-wrap xl:justify-between xl:items-center xl:text-lg
          lg:w-5/6 lg:flex-wrap lg:justify-between lg:items-center
          md:w-5/6 md:flex-wrap md:justify-between md:items-center text-sm
          sm:w-5/6 sm:justify-between sm:items-center
          "
      >
        {timeList.map((time) => {
          return (
            <Link
              className="
                m-3 p-2 flex justify-center items-center border
                border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white
                2xl:h-[14rem] 2xl:w-[14rem] 2xl:text-3xl
                xl:h-[12rem] xl:w-[12rem] xl:m-1 xl:text-2xl
                lg:h-[10rem] lg:w-[10rem] lg:m-1 lg:text-xl
                md:h-[9rem] md:w-[9rem] md:m-2 md:text-xl
                sm:h-[5rem] sm:w-[16rem] sm:m-0 sm:mb-5 sm:text-xl
                "
              href={`/membership/customMenu/${time.title}`}
              key={time.title}
            >
              <span className='p-2 border-b border-black'>{time.title}</span>
            </Link>
          );
        })}

        {timeList.length <= 9 ? (
          <Link
            className="
              m-3 p-2 flex justify-center items-center border
              border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white
              2xl:h-[14rem] 2xl:w-[14rem] 2xl:text-3xl
              xl:h-[12rem] xl:w-[12rem] xl:m-1 xl:text-2xl
              lg:h-[10rem] lg:w-[10rem] lg:m-1 lg:text-xl
              md:h-[9rem] md:w-[9rem] md:m-2 md:text-xl
              sm:h-[5rem] sm:w-[16rem] sm:m-0 sm:mb-5 sm:text-xl
              "
            href={"/membership/customMenu/add"}
          >
            <span className='p-2 border-b decoration-0 border-black'>add</span>
          </Link>
        ) : null}
      </ul>
    </div>
  );
}

export default Control;
