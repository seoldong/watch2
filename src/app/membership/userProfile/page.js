"use client";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase-config";

export default function UserProfile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState("");
  const [originProfile, setOriginProfile] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const tokenVerification = async () => {
      try {
        const url = "/api/signIn";
        const option = { method: "GET" };
        const checkSession = await fetch(url, option);

        if (checkSession.status === 200) {
          const userId = await auth.currentUser?.uid;
          if (userId) {
            const userId = auth.currentUser.uid;
            const profileDocRef = doc(db, `appUsers/${userId}/userData/profile`);
            const profileDocSnapshot = await getDoc(profileDocRef);
            const userProfileData = profileDocSnapshot.data();
            setUserProfile(userProfileData);
            setOriginProfile(userProfileData);
            setIsLogIn(true);
          }
        } else if (checkSession.status === 500) {
          setIsLogIn(false);
          alert("Login is required.");
          signOut(auth);
          router.push("/signIn");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => tokenVerification();
  }, [router]);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const profileDocRef = doc(db, `appUsers/${userId}/userData/profile`);
    const isProfileValid = userProfile && userProfile.displayName && userProfile.aboutMe && userProfile.photoURL;

    if (isLogIn === true && isProfileValid) {
      try {
        await updateDoc(profileDocRef, userProfile);
        router.refresh();
        router.push("/membership/customMenu");
      } catch (error) {
        console.error("Profile update error :", error);
      }
    } else {
      console.log('Please enter text')
    }
  };
  
  const onClickCancelHandler = async (e) => {
    e.preventDefault();
    setUserProfile("originProfile", originProfile);
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

  const onClickRefresh = () => {
    window.location.reload();
  }

  return (
    <div className="h-full w-full flex-col justify-center item-center">
      <div className="h-[15%] flex flex-col justify-center items-center"></div>
      <div
        className="h-[15%] flex justify-center items-center text-3xl
        xl:text-4xl
        lg:text-4xl
        sm:text-4xl
       "
      >
        <div className='flex'>
          <h1>"{userProfile?.displayName}"_profile</h1>
          <div 
          className='p-2 ml-10 flex border-b border-black 
          xl:text-xl
          lg:text-xl
          md:text-xl
          sm:text-2xl' 
          onClick={onClickRefresh}>refresh</div>
        </div>
      </div>

      <div className="h-[70%] flex-col 
          xl:text-3xl
          lg:text-3xl
          md:text-2xl
          sm:text-3xl
          ">
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
              className="p-2 border-b border-black hover:border-none hover:bg-slate-400 hover:text-white
              xl:mx-10 lg:p-3
              lg:mx-10 lg:p-3
              md:mx-10 md:p-2
              sm:m-10 sm:p-2
              "
              onClick={onSubmitHandler}
            >
              <p>S A V E</p>
            </button>
            <button
              className="p-2 border-b border-black hover:border-none hover:bg-slate-400 hover:text-white
              xl:mx-10 xl:p-3
              lg:mx-10 lg:p-3
              md:mx-10 md:p-2
              sm:m-10 sm:p-2
              "
              onClick={onClickCancelHandler}
            >
              <p>C A N C E L</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

