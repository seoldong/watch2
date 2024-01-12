"use client";
import { useEffect, useState } from "react";
import { getSetTime, timeData } from "../../../../logic/getTime";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "../../../../lib/firebase-config";
import { deleteField, doc, updateDoc } from "firebase/firestore";

function CustomMenuModifyPage({ timeSet, setBtn }) {
  const router = useRouter();
  const params = useParams();
  const title = params.title;
  const formatTime = (value) => String(value).padStart(2, "0");

  const [selectValue, setSelectValue] = useState(Number(0));

  useEffect(() => {
    let initTimeRangeValue = 0;
  
    if (timeSet && timeSet.settingTime) {
      initTimeRangeValue =
        timeSet.settingTime.getHours() * 60 + timeSet.settingTime.getMinutes();
    }
    setSelectValue(initTimeRangeValue);
  }, [timeSet]);
  


  function onClickSave(e) {

    if (selectValue) {
      const timeObj = timeData(selectValue);
      const settings = [0, timeObj.hours, timeObj.minutes, 0, 0];
      const newTimeSet = getSetTime(...settings);

      timeSet.setSettingTime(newTimeSet);
      setBtn.setSettingBtn(!setBtn.settingBtn);

      const updateSleepTime = async (set) => {
        const newTimeData = {
          [title]: set,
        };
        const uid = auth.currentUser.uid;
        const timePath = `appUsers/${uid}/userData/timeList`;
        const docRef = doc(db, timePath);
        const update = await updateDoc(docRef, newTimeData);
      };
      updateSleepTime(settings);
    }

  }

  function onClickCancel(e) {
    setBtn.setSettingBtn(!setBtn.settingBtn);
  }

  async function onClickDelete(e) {
    const dlelteRef = `appUsers/${auth.currentUser.uid}/userData/timeList`;
    const docRef = doc(db, dlelteRef);
    const deleteDoc = await updateDoc(docRef, { [title]: deleteField() });
    router.push(`/`);
  }

  let timeDataObj
  if (selectValue) {
    timeDataObj = timeData(selectValue)
  };

  return (
    <div className="h-full w-full flex-col justify-center item-center">
      <div className="h-[15%] flex flex-col justify-center items-center"></div>
      <div className=" h-[15%] flex justify-center items-center text-3xl
        2xl:text-4xl
        xl:text-4xl
        lg:text-4xl
        md:text-4xl
        sm:text-4xl
        "
      >
        <p>{`"${title}"_modify_setting`}</p>
      </div>

      <div
        className="h-[70%] flex-col
          2xl:text-2xl
          xl:text-2xl
          lg:text-2xl
          md:text-2xl
          sm:text-2xl
          "
      >
        {/*  */}
        <div className="h-1/2 w-full flex flex-col justify-start">

          <div className="h-[30%] w-full flex justify-center items-center">
            <div className="h-[3rem] w-2/6 flex justify-end items-center">
              <p>{`C U R R E N T : `}</p>
            </div>
            <p
              className="h-[3rem] w-2/6 mr-30 px-2 flex justify-center items-center outline-none border-b border-black focus:border-black
            2xl:text-3xl
            xl:text-3xl
            lg:text-3xl
            "
            >
              {selectValue
                ? `${formatTime(timeSet.settingTime.getHours())} : ${formatTime(timeSet.settingTime.getMinutes())}`
                : `loading...`}
            </p>
          </div>

          <div className="h-[30%] w-full flex justify-center items-center">
            <div className="h-[3rem] w-2/6 flex justify-end items-center">
              <p>{`S E T T I N G S : `}</p>
            </div>
            <p
              className="h-[3rem] w-2/6 mr-30 px-2 flex justify-center items-center outline-none border-b border-black focus:border-black
            2xl:text-3xl
            xl:text-3xl
            lg:text-3xl
            "
            >
              {selectValue
                ? `${formatTime(timeDataObj.hours)} : ${formatTime(timeDataObj.minutes)}`
                : `loading...`}
            </p>
          </div>

          <div className="
              h-1/4 py-10 px-20 
              2xl:px-40
              xl:px-40
              ">
            <input
              type="range"
              min={0}
              max={23.5 * 60}
              step={30}
              value={selectValue}
              onChange={(e) => setSelectValue(Number(e.target.value))}
            />
          </div>
        </div>
        {/*  */}
        <div className="h-1/2 sm:p-10">
          <div className="h-1/3 w-full flex justify-center items-center">
            <button
              className="h-[3rem] w-[10rem] mx-10 p-2 border-b border-black
              hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              onClick={(e) => onClickSave(e)}
            >
              S A V E
            </button>
            <button
              className="h-[3rem] w-[10rem] mx-10 p-2 border-b border-black
              hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              onClick={(e) => onClickCancel(e)}
            >
              C A N C E L
            </button>
          </div>
          <div className="w-full flex justify-center items-end">
            <button
              className="h-[3rem] w-[10rem] m-10 p-2 border-b border-black
              hover:border-none hover:bg-slate-400 hover:text-white font-medium"
              type="button"
              onClick={(e) => onClickDelete(e)}
            >
              D E L E T E
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomMenuModifyPage;
