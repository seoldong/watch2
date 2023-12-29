'use client'

import { useEffect, useState } from 'react';
import { getRemainingTime, getSetTime } from '../../../logic/getTime';
import Control from '../../../components/Control';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase-config';
import { useRouter } from 'next/navigation';


function CustomMenuPage() {
  const formatTime = (value) => String(value).padStart(2, "0");

  const [time, setTime] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSignState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('no user');
        // router.push('/signIn');
      }
    });
    return () => checkSignState();
  }, [router]);


  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const tomorrowMid = getSetTime(1, 0, 0, 0, 0);
      const remainingTime = getRemainingTime(tomorrowMid, currentTime);
      setTime(remainingTime);
    }, 1000);
    return () => { clearInterval(timer) }
  }, [router])

  return (
    <div
      style={{ height: '100%', width: '100%' }}
    >

      <div
        style={{ height: '50%' }}
        className='flex flex-col justify-center items-center'
      >
        <div
          style={{ height: '50%' }}
          className='flex justify-center items-center text-3xl tracking-wide'
        >
          <h3>tomorrow mid&nbsp;-&nbsp;</h3>
          <div>
            {time ?
              `${formatTime(time.rtHours)} : ${formatTime(time.rtMinutes)} : ${formatTime(time.rtSeconds)}`
              : 'loading...'}
          </div>
        </div>

        <div
          style={{ height: '50%' }}
        >
          <div
            style={{ height: '50%' }}
            className='flex justify-center items-center  text-xl tracking-wide'
          >
            <div>setting time&nbsp;:&nbsp;</div>
            <div>00 : 00 : 00</div>
          </div>
        </div>
      </div>


      <div
        style={{ height: '50%' }}
        className='flex justify-center items-center'
      >
        <Control />
      </div>
    </div>
  );
}

export default CustomMenuPage;