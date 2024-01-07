'use client'
import { doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase-config';


function MembershipDefaultMenuPage() {

  useEffect(() => {
    const observUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkTimeList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(db, `appUsers/${userId}/userData/timeList`);
          const userDataDocCheck = await getDoc(userDataDocRef)

          if (userDataDocCheck.exists()) {
            return;
          }
          else {
            const defaultTime = {
              midnight: [0, 24, 0, 0, 0],
              sleep: [0, 23, 0, 0, 0],
            }
            const userDataAddDoc = await setDoc(userDataDocRef, defaultTime);
          }
        }
        checkTimeList();
      }
      else {
        console.log('user is not signed in');
      }
    })

    return () => { observUser() }
  }, [])

  return (
    <>
      <div>
        <h1>Membership Default Menu Page</h1>
      </div>
      <div></div>
    </>
  );
}

export default MembershipDefaultMenuPage;