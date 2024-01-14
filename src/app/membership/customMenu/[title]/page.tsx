"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../lib/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getSetTime } from "../../../../logic/getTime";
import MembershipDisplayTime from "../../../../components/membership/membershipDisplayTime";
import CustomMenuModifyPage from "../modify/page";

interface TimeSet {
  settingTime: Date;
  setSettingTime: React.Dispatch<React.SetStateAction<Date>>;
}

interface SetBtn {
  settingBtn: boolean;
  setSettingBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomPage() {
  const params = useParams<{ title: string | undefined }>();
  const title = params.title;

  const [settingTime, setSettingTime] = useState<Date>(new Date());
  const [settingBtn, setSettingBtn] = useState<boolean>(true);

  useEffect(() => {
    const observUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkTimeList = async () => {
          const userId = user.uid;
          const userDataDocRef = doc(
            db,
            `appUsers/${userId}/userData/timeList`
          );
          const userDataDocCheck = await getDoc(userDataDocRef);
          const timeData = userDataDocCheck.get(title);

          if (timeData) {
            const resultsTime: Date = getSetTime(
              ...(timeData as [number, number, number, number, number])
            );
            setSettingTime(resultsTime);
          }
        };
        checkTimeList();
      } else {
        console.log("[title] > page.tsx : no signed");
        signOut(auth);
      }
    });

    return () => {
      observUser();
    };
  }, [title]);

  return (
    <>
      {settingBtn ? (
        <MembershipDisplayTime
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
        />
      ) : (
        <CustomMenuModifyPage
          timeSet={{ settingTime, setSettingTime }}
          setBtn={{ settingBtn, setSettingBtn }}
        />
      )}
    </>
  );
}

export default CustomPage;
