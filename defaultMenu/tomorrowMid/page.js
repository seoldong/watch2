'use client'
import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../../logic/getTime';
import Control from '../../../../components/Control';


export default function TomorrowMidPage() {
  const timeSet = getSetTime(1, 0, 0, 0, 0);
  const [tomorrowMid, setTomorrowMid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const remainingTime = getRemainingTime(timeSet, currentTime);
      setTomorrowMid(remainingTime);
      setLoading(false);
    }, 100);
    return () => clearInterval(timer);
  }, [timeSet])

  return (
    <>
      <h3>tomorrow mid</h3>
      <div>
        {`tomorrowMid : `}
        {loading ? 'loading...' :
          `${String(tomorrowMid.rtHours).padStart(2, '0')} 
            : ${String(tomorrowMid.rtMinutes).padStart(2, '0')} 
            : ${String(tomorrowMid.rtSeconds).padStart(2, '0')}`}
      </div>
      <div>
        {`setting time : `}
        {loading ? 'loading...' :
          `${String(timeSet.getMonth() + 1).padStart(2, '0')} 
            / ${String(timeSet.getDate()).padStart(2, '0')} 
            - ${String(timeSet.getHours()).padStart(2, '0')} 
            : ${String(timeSet.getMinutes()).padStart(2, '0')}`}
      </div>
    </>
  )
}
