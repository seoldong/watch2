'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TimeContext } from '../lib/guestContext';
import DisplayTime from '../components/guest/displayTime';
import SetGuestTime from '../components/guest/setGuestTime';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase-config';


export default function HomePage() {
  const router = useRouter();

  const initTimeList = {
    tomorrowMid: [0, 0, 0, 0, 0],
    sleep: [0, 23, 0, 0, 0],
    breakfast: [0, 7, 0, 0, 0],
    lunch: [0, 12, 0, 0, 0],
    dinner: [0, 18, 0, 0, 0],
  }

  const [timeTitle, setTimeTitle] = useState('tomorrowMid');
  const [timeList, setTimeList] = useState(initTimeList);
  const [settingBtn, setSettingBtn] = useState(true);

  useEffect(() => {
    const checkSignState = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/membership/customMenu');
      }
    });
    return () => checkSignState();
  }, [router]);


  return (
    <div
      className='h-full w-full'
    >
      <div
        className='h-1/2 w-full flex flex-col'>
        <TimeContext.Provider value={{ timeTitle, setTimeTitle, timeList, setTimeList }}>
          {settingBtn ?
            <DisplayTime setBtn={{ settingBtn, setSettingBtn }}
            /> :
            <SetGuestTime setBtn={{ settingBtn, setSettingBtn }}
            />}
        </TimeContext.Provider>
      </div>
      <div
        className='h-1/2 w-full flex flex-col items-center'
      >
        <div
          className='w-4/6 flex underline underline-offset-8 leading-10 flex-wrap
          lg:w-5/6
          md:w-5/6
          sm:w-5/6 sm:flex-wrap sm:justify-between sm:items-center
          '
        >
          <div
            className="m-3 flex justify-center items-center border
            2xl:h-[11rem] 2xl:w-[11rem]
            xl:h-[10rem] xl:w-[10rem] xl:m-1
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className='h-full w-full p-2 border border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white'
              onClick={() => setTimeTitle('tomorrowMid')}
            >
              <p>M I D N I G H T</p>
            </button>
          </div>
          <div
            className="m-3 flex justify-center items-center border
            2xl:h-[11rem] 2xl:w-[11rem]
            xl:h-[10rem] xl:w-[10rem] xl:m-1
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className='h-full w-full p-2 border border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white'
              onClick={() => setTimeTitle('sleep')}
            >
              <p>S L E E P</p>
            </button>
          </div>
          <div
            className="m-3 flex justify-center items-center border
            2xl:h-[11rem] 2xl:w-[11rem]
            xl:h-[10rem] xl:w-[10rem] xl:m-1
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className='h-full w-full p-2 border border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white'
              onClick={() => setTimeTitle('breakfast')}
            >
              <p>B R E A K F A S T</p>
            </button>
          </div>
          <div
            className="m-3 flex justify-center items-center border
            2xl:h-[11rem] 2xl:w-[11rem]
            xl:h-[10rem] xl:w-[10rem] xl:m-1
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className='h-full w-full p-2 border border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white'
              onClick={() => setTimeTitle('lunch')}
            >
              <p>L U N C H</p>
            </button>
          </div>
          <div
            className="m-3 flex justify-center items-center border
            2xl:h-[11rem] 2xl:w-[11rem]
            xl:h-[10rem] xl:w-[10rem] xl:m-1
            lg:h-[10rem] lg:w-[10rem] lg:m-1
            md:h-[9rem] md:w-[9rem] md:m-2
            sm:h-[10rem] sm:w-[10rem] sm:m-2
            "
          >
            <button
              className='h-full w-full p-2 border border-slate-400 hover:border-none hover:bg-slate-400 hover:text-white'
              onClick={() => setTimeTitle('dinner')}
            >
              <p>D I N N E R</p>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}


