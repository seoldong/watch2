"use client";

import { useState, useEffect } from "react";
import { getNow, getSetTime } from "../logic/getTime";

export default function NowToMidnight() {
  const [timeData, setTimeData] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const current = getNow().oriData;
      const tomorrowMid = getSetTime(1, 0, 0, 0, 0).oriData;
      const currentToMid = tomorrowMid - current;

      setTimeData(currentToMid);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeData / (1000 * 60 * 60));
  const minutes = Math.floor(timeData / (1000 * 60)) % 60;
  const seconds = Math.floor(timeData / 1000) % 60;

  return (
    <>
      <section>
        <div>
          <h1>
            {timeData ? `${hours} : ${minutes} : ${seconds}` : "loading..."}
          </h1>
        </div>
        <div>
          <h3>오늘 자정까지 남은 시간</h3>
        </div>
      </section>
    </>
  );
}
//음료 포도 오렌지
//짱아찌 담는 간장
//
