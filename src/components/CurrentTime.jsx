"use client";
import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(null);
  const [timeStyle, setTimeStyle] = useState("24");
  const formatTime = (value) => String(value).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      const timeDataObj = {
        year: current.getFullYear(),
        month: formatTime(current.getMonth() + 1),
        date: formatTime(current.getDate()),
        hours: formatTime(current.getHours()),
        minutes: formatTime(current.getMinutes()),
        seconds: formatTime(current.getSeconds()),
      };
      setCurrentTime(timeDataObj);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function displayTime() {
    if (timeStyle === "24") {
      return (
        <>
          {currentTime
            ? `
        ${currentTime.year} - 
        ${currentTime.month} - 
        ${currentTime.date} _
        ${currentTime.hours} : 
        ${currentTime.minutes} : 
        ${currentTime.seconds}`
            : "loading..."}
        </>
      );
    }
    if (timeStyle === "12") {
      return (
        <>
          {currentTime
            ? `
        ${currentTime.year} - 
        ${currentTime.month} - 
        ${currentTime.date} _
        ${currentTime.hours >= 12 ? "PM" : "AM"} : 
        ${
          currentTime.hours >= 12 ? currentTime.hours - 12 : currentTime.hours
        } :
        ${currentTime.minutes} : 
        ${currentTime.seconds}`
            : "loading..."}
        </>
      );
    }
  }

  function changeTimeStyle() {
    if (timeStyle === "24") {
      setTimeStyle("12");
    } else {
      setTimeStyle("24");
    }
  }

  return (
    <button
      onClick={changeTimeStyle}>
      {displayTime()}
    </button>
  );
}
