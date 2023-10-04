"use client";

import Link from "next/link";
import { getNow, getSetTime } from "../../../../logic/getTime";
import { useContext, useState } from "react";
import { TimeState } from "../../../../context/timeContext";

export function AddSleep() {
  const testCon = useContext(TimeState);
  const [timeValue, setTimeValue] = useState(testCon);
  const [selectTime, setSelectTime] = useState(0);

  const now = getNow();
  const tomorrowMidData = getSetTime(1, 0, 0, 0, 0);
  const nowToMid = tomorrowMidData.totlaSec - now.totlaSec;

  const residue = nowToMid % 1800000; //나머지
  const subtractRemainder = nowToMid - residue; //전체값 - 나머지 = today 바 길이
  const maxValue =
    timeValue === "today" ? subtractRemainder : subtractRemainder + 86400000;

  function handleSelectValue() {
    const currentTime = Number(now.totlaSec);
    const Residue = Number(residue);
    const SelectTime = Number(selectTime);
    const sum = currentTime + Residue + SelectTime;
    const selectData = new Date(sum);
  }

  function handleChangeState() {
    timeValue === "today" ? setTimeValue("tomorrow") : setTimeValue("today");
  }

  return (
    <>
      <p>add sleep time</p>
      <input
        type="range"
        min={0}
        max={maxValue}
        step={1800000}
        onChange={(e) => setSelectTime(e.target.value)}
      />
      <Button
        onClickSelect={handleSelectValue}
        onclickChange={handleChangeState}
      />
    </>
  );
}

function Button({ onClickSelect, onclickChange }) {
  return (
    <>
      <div>
        <button onClick={(e) => onClickSelect()}>select time</button>
        <button onClick={(e) => onclickChange()}>add next day</button>
      </div>

      <Link href={"/"}>
        <div>home</div>
      </Link>
    </>
  );
}

//24시간 = 86400;
//양방향 range?
