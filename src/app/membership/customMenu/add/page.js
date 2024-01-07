"use client";
import { useEffect, useState } from "react";
import { timeData } from "../../../../logic/getTime";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../lib/firebase-config";

export default function CustomAddPage() {
  const params = useParams();
  const title = params.title;
  const router = useRouter();
  const formatTime = (value) => String(value).padStart(2, "0");

  const [timeTitle, setTimeTitle] = useState("");
  const [selectedTime, setSelectTime] = useState(0);
  const [timeTitleList, setTimeTitleList] = useState([]);

  useEffect(() => {
    const observUser = auth.onAuthStateChanged((user) => {
      if (user) {
        const checkList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(
            db,
            `appUsers/${userId}/userData/timeList`
          );
          const userTimeList = (await getDoc(userDataDocRef)).data();
          const userTimeTitleList = Object.keys(userTimeList);
          setTimeTitleList(userTimeTitleList);
        };
        checkList();
      } else {
        console.log("user is not signed in");
      }
    });
    return () => {
      observUser();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!timeTitle) {
      return alert("타이틀을 입력하세요.");
    }

    if (timeTitleList.includes(title)) {
      return alert("Title already exists.");
    }

    const settingTime = timeData(selectedTime);
    const newTime = [0, settingTime.hours, settingTime.minutes, 0, 0];

    const upDataTime = async () => {
      const userId = auth.currentUser.uid;
      const timeListPath = `appUsers/${userId}/userData/timeList`;
      const userDataDocRef = doc(db, timeListPath);
      const newTimeData = { [timeTitle]: newTime };
      const updateData = await updateDoc(userDataDocRef, newTimeData);
      router.push(`/membership/customMenu`);
    };
    upDataTime();
  };

  function onClickCancel(e) {
    router.push(`/membership/customMenu`);
  }

  const dpTimeValue = timeData(selectedTime);

  const handleTitleChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, "_");
    const truncatedValue = formattedValue.slice(0, 12);
    setTimeTitle(truncatedValue);
  };

  return (
    <div className="h-full w-full flex-col justify-center item-center">
      <div className="h-[15%] flex flex-col justify-center items-center"></div>
      <div className=" h-[15%] flex justify-center items-center 
        xl:text-4xl
        lg:text-4xl
        md:text-4xl
        sm:text-4xl
       "
      >
        <p>add_time_setting</p>
      </div>

      <div
        className="h-[70%] flex-col
        xl:text-3xl
        lg:text-3xl
        md:text-3xl
        sm:text-3xl
      "
      >
        {/*  */}
        <form className="h-1/2 flex flex-col" onSubmit={handleSubmit}>

          <div className="h-[40%] w-full flex justify-center items-center tracking-wide">
            <div className="h-full w-full flex justify-center items-center">
              <label
                className="h-[3rem] w-2/6 flex justify-end items-center"
                htmlFor="timeTitle"
              >
                <p>time_title :</p>
              </label>
              <input
                className="h-[3rem] w-2/6 mr-30 px-2 flex outline-none border-b border-black focus:border-black"
                type="text"
                id="timeTitle"
                placeholder='" only text "'
                onChange={handleTitleChange}
              />
            </div>
          </div>

          <div className="h-[40%] w-full flex flex-col items-center tracking-wide">
            <div className="h-2/5 w-full flex justify-center items-center">
              <label
                className="h-[3rem] w-2/6 flex justify-end items-center"
                htmlFor="timeLangth"
              >
                <p>set_time :</p>
              </label>
              {dpTimeValue !== null ? (
                <div 
                className="h-[3rem] w-2/6 mr-30 px-2 flex justify-center items-center outline-none border-b border-black focus:border-black"
                >
                  {formatTime(dpTimeValue.hours)} :{" "}
                  {formatTime(dpTimeValue.minutes)}
                </div>
              ) : (
                `loading...`
              )}
            </div>

            <div className="h-3/5 w-[70%] mt-16 pt-5 flex justify-center items-cneter">
              <input
                className="h-1/2 w-3/5"
                id="timeLangth"
                type="range"
                min={0}
                max={23.5 * 60}
                step={30}
                value={selectedTime}
                onChange={(e) => setSelectTime(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="h-32 flex text-2xl">
          <div className="h-full w-full flex justify-center items-center">
            <button
              className="h-[3rem] w-[10rem] mx-10 p-2 border-b border-black
              hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <p>C R E A T E</p>
            </button>
            <button
              className="h-[3rem] w-[10rem] mx-10 p-2 border-b border-black
              hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              onClick={(e) => onClickCancel(e)}
            >
              <p>C A N C E L</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
