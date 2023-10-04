export function getNow() {
  const oriData = new Date();
  const year = oriData.getFullYear();
  const month = oriData.getMonth() + 1;
  const date = oriData.getDate();
  const hours = oriData.getHours();
  const minutes = oriData.getMinutes();
  const seconds = oriData.getSeconds();
  const totlaSec = oriData.getTime();
  return { oriData, totlaSec, year, month, date, hours, minutes, seconds };
}

export function getSetTime(d, h, m, s, ms) {
  const today = new Date();
  const oriData = new Date(today);
  oriData.setDate(today.getDate() + d);
  oriData.setHours(h, m, s, ms);

  const year = oriData.getFullYear();
  const month = oriData.getMonth() + 1;
  const date = oriData.getDate();
  const hours = oriData.getHours();
  const minutes = oriData.getMinutes();
  const seconds = oriData.getSeconds();
  const totlaSec = oriData.getTime();
  return { oriData, totlaSec, year, month, date, hours, minutes, seconds };
}
