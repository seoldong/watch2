'use client';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase-config';


export default function UserProfile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    const tokenVerification = async () => {
      try {
        const url = '/api/signIn';
        const option = { method: 'GET' };
        const checkSession = await fetch(url, option);

        if (checkSession.status === 200) {
          const userId = auth.currentUser?.uid;
          if (userId) {
            const userRef = doc(db, 'appUsers', userId);
            const userDataCollectionRef = collection(userRef, 'userData');
            const profileDocRef = doc(userDataCollectionRef, 'profile');
            const profileDocSnapshot = await getDoc(profileDocRef);
            const userProfileData = profileDocSnapshot.data();
            setUserProfile(userProfileData);
            router.refresh();
          }
        } else if (checkSession.status === 500) {
          setIsLogIn(false);
          alert('로그인이 필요합니다.');
          signOut(auth);
          router.push('/signIn');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    return () => tokenVerification();
  }, [router]);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'appUsers', userId);
    const userDataCollectionRef = collection(userRef, 'userData');
    const profileDocRef = doc(userDataCollectionRef, 'profile');

    if (isLogIn === true) {
      await updateDoc(profileDocRef, userProfile);
    }
    router.refresh();
    router.push('/membership/customMenu');
  }

  const onClickCancelHandler = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'appUsers', userId);
    const userDataCollectionRef = collection(userRef, 'userData');
    const profileDocRef = doc(userDataCollectionRef, 'profile');
    const profileDocSnapshot = await getDoc(profileDocRef);
    const userProfileData = await profileDocSnapshot.data();

    setUserProfile(userProfileData);
    router.refresh();
    router.push('/membership/customMenu');
  }

  const handleDisplayChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, '_');
    const truncatedValue = formattedValue.slice(0, 20);
    if (truncatedValue.length === 0) {
      alert('텍스트를 입력하세요.');
    } else {
      setUserProfile({ ...userProfile, displayName: truncatedValue });
    }
  }

  const handleAboutMeChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, '_');
    const truncatedValue = formattedValue.slice(0, 20);
    if (truncatedValue.length === 0) {
      alert('텍스트를 입력하세요.');
    } else {
      setUserProfile({ ...userProfile, aboutMe: truncatedValue });
    }
  }

  const handlePhotoChange = (e) => {
    const inputValue = e.target.value.trim();
    const formattedValue = inputValue.replace(/\s/g, '_');
    const truncatedValue = formattedValue.slice(0, 20);
    if (truncatedValue.length === 0) {
      alert('텍스트를 입력하세요.');
    } else {
      setUserProfile({ ...userProfile, photoURL: truncatedValue });
    }
  }



  return (
    <div
      style={{ height: '80%', width: '60%' }}
      className='flex flex-col justify-center items-center'
    >
      <div
        style={{ height: '20%', width: '100%' }}
        className='flex justify-center items-center text-3xl'
      >
        <h1>U S E R - P R O F I L E</h1>
      </div>
      <div
        style={{ height: '60%', width: '100%' }}
        className='flex justify-center'
      >
        <form
          style={{ height: '100%', width: '80%' }}
          className='flex flex-col items-center'
          onSubmit={onSubmitHandler}>
          {/*  */}

          <div
            style={{ height: '30%', width: '100%' }}
            className='flex justify-center items-end'
          >
            <label
              style={{ height: '3rem', width: '50%' }}
              className='pr-10 flex justify-end items-center'
              htmlFor='displayName'>D I S P L A Y _ N A M E :</label>
            <input
              style={{ height: '3rem', width: '50%' }}
              className='p-2 flex justify-center items-center outline-none border-b-2 focus:border-black'
              type="text"
              id='displayName'
              placeholder={userProfile?.displayName}
              // onChange={(e) => setUserProfile({ ...userProfile, displayName: e.target.value })}
              onChange={handleDisplayChange}
            />
          </div>
          {/*  */}
          <div
            style={{ height: '30%', width: '100%' }}
            className='flex justify-center items-center'
          >
            <label
              style={{ height: '3rem', width: '50%' }}
              className='pr-10 flex justify-end items-center'
              htmlFor='aboutMe'>A B O U T _ M E :</label>
            <input
              style={{ height: '3rem', width: '50%' }}
              className='p-2 flex justify-center items-center outline-none border-b-2 focus:border-black'
              type="text"
              id='aboutMe'
              placeholder={userProfile?.aboutMe}
              onChange={handleAboutMeChange}
            />
          </div>
          {/*  */}
          <div
            style={{ height: '30%', width: '100%' }}
            className='flex justify-center items-start'
          >
            <label
              style={{ height: '3rem', width: '50%' }}
              className='pr-10 flex justify-end items-center'
              htmlFor='photoURL'>P H O T O :</label>
            <input
              style={{ height: '3rem', width: '50%' }}
              className='p-2 flex justify-center items-center outline-none border-b-2 focus:border-black'
              type="text"
              id='photoURL'
              placeholder={userProfile?.photoURL}
              onChange={handlePhotoChange}
            />
          </div>
        </form>
        {/*  */}
      </div>
      <div
        style={{ height: '20%', width: '100%' }}
        className='flex justify-center items-center border border-gray-400'
      >
        <button
          style={{ height: "3rem", width: "8rem" }}
          className="flex justify-center items-center m-2 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
          onClick={onSubmitHandler}>S A V E</button>
        <button
          style={{ height: "3rem", width: "8rem" }}
          className="flex justify-center items-center m-2 underline underline-offset-8 hover:border-none hover:bg-slate-400 hover:text-white font-medium"
          onClick={onClickCancelHandler}>C A N C E L</button>
      </div>
    </div >
  );
}