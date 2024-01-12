'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../../lib/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getSetTime } from '../../../../logic/getTime';
import MembershipDisplayTime from '../../../../components/membership/membershipDisplayTime'
import CustomMenuModifyPage from '../modify/page'


function CustomPage() {
  const params = useParams();
  const title = params.title;

  const [settingTime, setSettingTime] = useState();
  const [settingBtn, setSettingBtn] = useState(true);
  console.log('settingTime', settingTime, typeof settingTime);


  useEffect(() => {
    const observUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkTimeList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(db, `appUsers/${userId}/userData/timeList`);
          const userDataDocCheck = await getDoc(userDataDocRef);
          const timeData = userDataDocCheck.get(title);

          const resultsTime = getSetTime(...timeData);
          setSettingTime(resultsTime);
        }
        checkTimeList();
      }
      else {
        console.log('user is not signed in');
        signOut(auth);
      }
    })

    return () => { observUser() }
  }, [title])

  return (
    <>
      {settingBtn ?
        <MembershipDisplayTime
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
        /> :
        <CustomMenuModifyPage
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
          rangeMin={0}
          rangeMax={(24) * 60} />}
    </>
  )
}

export default CustomPage;