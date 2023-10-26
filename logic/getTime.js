export function getSetTime(addDay, setHor, setMin, setSec, setMilliSec) {
  const today = new Date();
  const getTimeData = new Date(today);
  getTimeData.setDate(today.getDate() + addDay);
  getTimeData.setHours(setHor, setMin, setSec, setMilliSec);
  return getTimeData;
}



export function getRemainingTime(timeData, currentData) {

  let setTimeData = timeData;
  let currentToTimeRange = setTimeData - currentData;

  const rtHours = Math.floor(currentToTimeRange / (1000 * 60 * 60));
  const rtMinutes = Math.floor(currentToTimeRange / (1000 * 60)) % 60;
  const rtSeconds = Math.floor(currentToTimeRange / 1000) % 60;
  return { rtHours, rtMinutes, rtSeconds, setTimeData }
}



export function timeData(selectedSleepTime) { //분단위 숫자를 시간으로 변환
  let day = 0;
  let hours = Math.floor(selectedSleepTime / 60);
  const minutes = Math.floor(selectedSleepTime % 60);
  if (hours >= 24) {
    hours = Math.floor(selectedSleepTime / 60 - 24);
    day = 1;
  }
  return { day, hours, minutes, }
}



