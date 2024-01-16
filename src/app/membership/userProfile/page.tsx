"use client";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { DocumentData, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase-config";

interface Profile {
  displayName: string;
  aboutMe: string;
  photoURL: string;
}

export default function UserProfile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [originProfile, setOriginProfile] = useState<Profile | null>(null);
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [checkSession, setCheckSession] = useState<boolean>(false);

  useEffect(() => {
    const tokenVerification = async () => {
      try {
        const url = "/api/signIn";
        const option = { method: "GET" };
        const checkSession = await fetch(url, option);
        const checkSessionState = checkSession.status;
        if (checkSessionState === 200) {
          setIsLogIn(true);
          setCheckSession(true);
        }
      } catch (error) {
        setCheckSession(false);
        console.log(error);
      }
    };
    tokenVerification()

    return () => {};
  }, [router, setCheckSession, setIsLogIn]);

  useEffect(() => {
    if (checkSession) {
      const getUserProfile = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = auth.currentUser.uid;
          const profileDocRef = doc(db, `appUsers/${userId}/userData/profile`);
          const profileDocSnapshot = await getDoc(profileDocRef);
          const userProfileData = profileDocSnapshot.data() as Profile;
          
          setUserProfile(userProfileData);
          setOriginProfile(userProfileData);
          setIsLogIn(true);
        } else {
          setIsLogIn(false);
          alert("Login is required.");
          signOut(auth);
          router.push("/signIn");
        }
      });
      return () => getUserProfile();
    } else {
      console.log("Please sign in"); // 추가 작동 설정필요
    }
  }, [checkSession, router]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const profileDocRef = doc(db, `appUsers/${userId}/userData/profile`);
    const isProfileValid =
      userProfile &&
      userProfile.displayName &&
      userProfile.aboutMe &&
      userProfile.photoURL;

    if (isLogIn === true && isProfileValid) {
      try {
        // await updateDoc(profileDocRef, userProfile);
        await setDoc(profileDocRef, userProfile);
        router.refresh();
        router.push("/membership/customMenu");
      } catch (error) {
        console.error("Profile update error :", error);
      }
    } else {
      console.log("Please enter text");
    }
  };

  const onClickCancelHandler = async (e) => {
    e.preventDefault();
    setUserProfile(originProfile);
    // router.refresh();
    router.push("/membership/customMenu");
  };

  const handleDisplayChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, "_");
    const truncatedValue = formattedValue.slice(0, 20);
    setUserProfile({ ...userProfile, displayName: truncatedValue });
  };

  const handleAboutMeChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, "_");
    const truncatedValue = formattedValue.slice(0, 20);
    setUserProfile({ ...userProfile, aboutMe: truncatedValue });
  };

  const handlePhotoChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, "_");
    const truncatedValue = formattedValue.slice(0, 20);
    setUserProfile({ ...userProfile, photoURL: truncatedValue });
  };

  return (
    <div className="h-full w-full flex-col justify-center item-center">
      <div className="h-[15%] flex flex-col justify-center items-center"></div>
      <div
        className="h-[15%] flex justify-center items-center text-3xl
        2xl:text-4xl
        xl:text-4xl
        lg:text-4xl
        md:text-4xl
        sm:text-4xl
       "
      >
        <div className="flex">
          <h1>{`"${userProfile?.displayName}"_profile`}</h1>
          {/* <div
            className='p-2 ml-10 flex border-b border-black 
          xl:text-xl
          lg:text-xl
          md:text-xl
          sm:text-2xl'
            onClick={onClickRefresh}>refresh</div> */}
        </div>
      </div>

      <div
        className="h-[70%] flex-col 
          2xl:text-3xl
          xl:text-3xl
          lg:text-3xl
          md:text-2xl
          sm:text-2xl
          "
      >
        <form
          className="h-1/2 w-full flex-col justify-start"
          onSubmit={onSubmitHandler}
        >
          <div className="p-5 h-1/4 flex justify-center item-center">
            <label
              className="h-[3rem] w-2/6 flex justify-end items-center"
              htmlFor="displayName"
            >
              <p>display_name :</p>
            </label>
            <input
              className="h-[3rem] w-2/6 mr-30 px-5 flex justify-start items-center outline-none border-b border-black focus:border-black"
              type="text"
              id="displayName"
              placeholder={userProfile?.displayName}
              // onChange={(e) => setUserProfile({ ...userProfile, displayName: e.target.value })}
              onChange={handleDisplayChange}
            />
          </div>
          <div className="p-5 h-1/4 flex justify-center item-center">
            <label
              className="h-[3rem] w-2/6 flex justify-end items-center"
              htmlFor="aboutMe"
            >
              <p>about_me :</p>
            </label>
            <input
              className="h-[3rem] w-2/6 mr-30 px-5 flex justify-start items-center outline-none border-b border-black focus:border-black"
              type="text"
              id="aboutMe"
              placeholder={userProfile?.aboutMe}
              onChange={handleAboutMeChange}
            />
          </div>
          <div className="p-5 h-1/4 flex justify-center item-center">
            <label
              className="h-[3rem] w-2/6 flex justify-end items-center"
              htmlFor="photoURL"
            >
              <p>photo :</p>
            </label>
            <input
              className="h-[3rem] w-2/6 mr-30 px-5 flex justify-start items-center outline-none border-b border-black focus:border-black"
              type="text"
              id="photoURL"
              placeholder={userProfile?.photoURL}
              onChange={handlePhotoChange}
            />
          </div>
        </form>
        <div className="h-1/2 w-full flex justify-center items-start">
          <div className="h-1/3 w-full flex justify-center items-center">
            <button
              className="
              2xl:mx-10
              xl:mx-10 xl:p-3
              lg:mx-10 lg:p-3
              md:mx-10 md:p-2
              sm:m-10 sm:p-2
              "
              onClick={onSubmitHandler}
            >
              <span
                className="p-2 border-b border-black
                     hover:border-none hover:bg-slate-400 hover:text-white"
              >
                S A V E
              </span>
            </button>
            <button
              className="
              2xl:mx-10
              lg:mx-10 lg:p-3
              md:mx-10 md:p-2
              sm:m-10 sm:p-2
              "
              onClick={onClickCancelHandler}
            >
              <span
                className="p-2 border-b border-black
                     hover:border-none hover:bg-slate-400 hover:text-white"
              >
                C A N C E L
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
