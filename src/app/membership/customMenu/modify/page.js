'use client'
import { useEffect, useState } from 'react';
import { getSetTime, timeData } from '../../../../logic/getTime';
import { useParams, useRouter } from 'next/navigation';
import { auth, db } from '../../../../lib/firebase-config';
import { deleteField, doc, updateDoc } from 'firebase/firestore';


function CustomMenuModifyPage({ timeSet, setBtn }) {
  const router = useRouter();
  const params = useParams();
  const title = params.title;
  const formatTime = (value) => String(value).padStart(2, '0');

  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    let initTimeRangeValue = null;
    if (timeSet.settingTime !== null) {
      initTimeRangeValue = timeSet.settingTime.getHours() * 60 + timeSet.settingTime.getMinutes()
    }
    setSelectValue(initTimeRangeValue);
  }, [timeSet.settingTime])


  function onClickSave(e) {
    const timeObj = timeData(selectValue);
    const settings = [0, timeObj.hours, timeObj.minutes, 0, 0];
    const newTimeSet = getSetTime(...settings);
    timeSet.setSettingTime(newTimeSet);
    setBtn.setSettingBtn(!setBtn.settingBtn);

    const updateSleepTime = async (set) => {
      const newTimeData = {
        [title]: set,
      };
      const uid = auth.currentUser.uid;
      const timePath = `appUsers/${uid}/userData/timeList`;
      const docRef = doc(db, timePath);
      const update = await updateDoc(docRef, newTimeData);
    };
    updateSleepTime(settings);
  }

  function onClickCancel(e) {
    setBtn.setSettingBtn(!setBtn.settingBtn);
  }

  async function onClickDelete(e) {
    const dlelteRef = `appUsers/${auth.currentUser.uid}/userData/timeList`
    const docRef = doc(db, dlelteRef);
    const deleteDoc = await updateDoc(docRef, { [title]: deleteField() });
    router.push(`/`);
  }

  let timeDataObj = timeData(selectValue);

  return (
    <div
      style={{ height: '80%', width: '60%' }}
      className='flex flex-col justify-center items-center'
    >
      <div
        style={{ height: '30%', width: '100%' }}
        className='flex flex-col'
      >
        <div
          style={{ height: '60%', width: '100%' }}
          className='flex justify-center items-center text-3xl'
        >{title}</div>
        <div
          style={{ height: '40%', width: '100%' }}
          className='flex justify-center text-xl'
        >modify setting</div>
      </div>
      {/*  */}
      <div
        style={{ height: '50%', width: '100%' }}
        className='flex flex-col justify-center'
      >
        <div
          style={{ height: '3rem', width: '100%' }}
          className='flex items-center'
        >
          <p
            style={{ width: '50%' }}
            className='pr-10 flex justify-end items-center'
          >{`C U R R E N T : `}</p>
          <p
            style={{ width: '50%' }}
            className='pl-10 flex justify-start items-center text-xl'
          >
            {selectValue !== null ?
              `${formatTime(timeSet.settingTime.getHours())} :
                      ${formatTime(timeSet.settingTime.getMinutes())}` :
              `loading...`}
          </p>
        </div>
        <div
          style={{ height: '3rem', width: '100%' }}
          className='flex items-center'
        >
          <p
            style={{ width: '50%' }}
            className='pr-10 flex justify-end items-center'
          >{`S E T T I N G S : `}</p>
          <p
            style={{ width: '50%' }}
            className='pl-10 flex justify-start items-center text-xl'
          >
            {selectValue !== null ?
              `${formatTime(timeDataObj.hours)} :
                      ${formatTime(timeDataObj.minutes)}` :
              `loading...`}
          </p>
        </div>
        <div
          style={{ height: '', width: '100%' }}
          className='pt-5 flex justify-center items-end'
        >
          <input
            style={{ height: '5rem', width: '80%' }}
            type='range'
            min={0}
            max={(23.5) * 60}
            step={30}
            value={selectValue !== null && selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          />
        </div>
      </div>

      <div
        style={{ height: '20%', width: '100%' }}
        className='flex justify-center items-center border border-gray-400'
      >
        <button
          style={{ height: "3rem", width: "8rem" }}
          className="my-5 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
          onClick={(e) => { onClickSave(e) }}>S A V E</button >
        <button
          style={{ height: "3rem", width: "8rem" }}
          className="my-5 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
          onClick={(e) => onClickCancel(e)}>C A N C E L</button >

      </div>



      <div
        style={{ height: '20%', width: '100%' }}
        className='flex justify-center items-end'
      >
        <button
          style={{ height: "3rem", width: "8rem" }}
          className="mb-5 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
          type='button'
          onClick={(e) => onClickDelete(e)}>D E L E T E</button >
      </div>
    </div>
  )
}

export default CustomMenuModifyPage;