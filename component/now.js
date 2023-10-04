"use client";

import { useState, useEffect } from "react";
import { getNow } from "../logic/getTime";

export default function Now() {
  const [timeData, setTimeData] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const nowData = getNow();
      setTimeData(nowData);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section>
        <div>
          {timeData
            ? `${timeData.hours} : ${timeData.minutes} : ${timeData.seconds}`
            : "loading..."}
        </div>
      </section>
    </>
  );
}
