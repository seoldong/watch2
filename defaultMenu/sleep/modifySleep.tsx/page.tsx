"use client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { getSetTime, timeData } from "../../../../../logic/getTime";
import { auth, db } from "../../../../../lib/firebase-config";
import Control from '../../../../../components/Control';


function SetSleepPage({ timeName, timeSet, setBtn, rangeMin, rangeMax }) {
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    let initTimeRangeValue = null;
    if (timeSet.settingTime !== null) {
      initTimeRangeValue =
        timeSet.settingTime.getHours() * 60 + timeSet.settingTime.getMinutes();
    }
    setSelectValue(initTimeRangeValue);
  }, [timeSet]);

  function onClickSave(e) {
    const timeObj = timeData(selectValue);
    const settings = [0, timeObj.hours, timeObj.minutes, 0, 0];
    const newTimeSet = getSetTime(...settings);
    timeSet.setSettingTime(newTimeSet);
    setBtn.setSettingBtn(!setBtn.settingBtn);

    const updateSleepTime = async (set) => {
      const newSleepData = {
        sleep: set,
      };
      const uid = auth.currentUser.uid;
      const timePath = `appUsers/${uid}/userData/timeList`;
      const docRef = doc(db, timePath);
      const update = await updateDoc(docRef, newSleepData);
    };
    updateSleepTime(settings);
  }

  function onClickCancel(e) {
    setBtn.setSettingBtn(!setBtn.settingBtn);
  }

  let timeDataObj = timeData(selectValue);

  return (
    <>
      <div>sleep settings Page</div>
      <div>
        {`${timeName.timeTitle} settings time : `}
        {selectValue
          ? `${timeDataObj.hours} :
                ${timeDataObj.minutes}`
          : `loading...`}
      </div>

      <input
        type="range"
        min={rangeMin}
        max={rangeMax}
        step={30}
        value={selectValue !== null && selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      />
      <button onClick={(e) => onClickSave(e)}>save</button>
      <button onClick={(e) => onClickCancel(e)}>cancel</button>
    </>
  );
}

export default SetSleepPage;
