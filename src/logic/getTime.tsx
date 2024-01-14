export function getSetTime(
  addDay: number,
  setHor: number,
  setMin: number,
  setSec: number,
  setMilliSec: number
  ): Date {
  const today: Date = new Date();
  const getTimeData: Date = new Date(today);

  getTimeData.setDate(today.getDate() + addDay);
  getTimeData.setHours(setHor, setMin, setSec, setMilliSec);

  return getTimeData;
} //5개의 인자를 받아서 시간을 설정하는 함수





export function getRemainingTime(timeData: Date, currentData: Date): {
  rtHours: number;
  rtMinutes: number;
  rtSeconds: number;
  setTimeData: Date;
} {
  const setTimeData: Date = timeData;
  let currentToTimeRange: number = setTimeData.getTime() - currentData.getTime();
  const rtHours: number = Math.floor(currentToTimeRange / (1000 * 60 * 60));
  const rtMinutes: number = Math.floor(currentToTimeRange / (1000 * 60)) % 60;
  const rtSeconds:number = Math.floor(currentToTimeRange / 1000) % 60;

  return { rtHours, rtMinutes, rtSeconds, setTimeData }
} //2개의 인자를 받아서 남은 시간을 계산하는 함수



export function timeData(selectedSleepTime: number): {
  day: number;
  hours: number;
  minutes: number;
} { //분단위 숫자를 시간으로 변환
  let day: number = 0;
  let hours: number = Math.floor(selectedSleepTime / 60);
  const minutes: number = Math.floor(selectedSleepTime % 60);
  if (hours >= 24) {
    hours = Math.floor((selectedSleepTime / 60) - 24);
    day = 1;
  }
  return { day, hours, minutes, }
}