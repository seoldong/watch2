const { createContext } = require('react');



async function getTimeData(){
    const url = 'http://localhost:9999/timeList';
    const optionss = { cache: "no-store" }
    const res = await fetch(url, optionss);
    const timeData = await res.json();
    const userTimeSettingData = createContext(timeData);
    return userTimeSettingData
}
getTimeData()

export default getTimeData;