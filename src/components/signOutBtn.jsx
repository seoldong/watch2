"use client";
<<<<<<< HEAD
import { auth } from "src/lib/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { ShowMenuContext } from '../lib/showMenuContext';


function SignOutBtn() {
  const router = useRouter();
  const showCon = useContext(ShowMenuContext);
=======

import { auth } from "src/lib/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function SignOutBtn() {
  const router = useRouter();
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9

  async function signOutHandler() {
    try {
      const url = "/api/signOut";
      const option = { method: "POST" };
<<<<<<< HEAD
      const sessionStop = await fetch(url, option);
      showCon.setShowMenu(true);
      await signOut(auth);
      await router.push('/');
      console.log(showCon);
=======
      const sessionStop = await fetch("/api/signOut", option);
      await signOut(auth);
      router.push("/");
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
    } catch (err) {
      console.log(err);
    }
  }

  return (
<<<<<<< HEAD
      <a className="p-2 flex justify-center items-center cursor-pointer border-b border-black
         xl:mx-3 
         md:ml-5"
         onClick={() => signOutHandler()}
      >
        <p>S I G N O U T</p>
      </a>
=======
    <button
      onClick={() => signOutHandler()}
    >
      S I G N O U T
    </button>
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
  );
}

export default SignOutBtn;
<<<<<<< HEAD

=======
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
