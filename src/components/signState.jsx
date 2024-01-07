"use client";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
import { useRouter } from "next/navigation";
import SignOutBtn from "./signOutBtn";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase-config";
import { ShowMenuContext } from "../lib/showMenuContext";

<<<<<<< HEAD
// sm > nav > signIn 이동 후 깜박임 있음

=======
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
export default function SignState() {
  const router = useRouter();
  const showCon = useContext(ShowMenuContext);
  const [signState, setSignState] = useState(false);

  useEffect(() => {
    const checkSignState = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("user signed in");
        setSignState(true);
      } else {
        // console.log("user signed out");
        signOut(auth);
        setSignState(false);
      }
    });
    return () => checkSignState();
  }, [router]);

  function signInState() {
    return (
      <div
<<<<<<< HEAD
        className={`flex items-center
        sm:flex-col`}
      >
        <div
          className={`my-10
          hover:border-none hover:bg-slate-400 hover:text-white
          `}
        >
          <a className="p-2 flex justify-center items-center cursor-pointer border-b border-black
            xl:mx-3
            lg:mx-5"
             href={"/membership/userProfile"}
             onClick={() => showCon.setShowMenu(false)}
          >
            <p>P R O F I L E</p>
          </a>
        </div>

        <div
          className="my-10
          hover:border-none hover:bg-slate-400 hover:text-white
          "
=======
        className="flex items-center text-gray-700
      sm:flex-col sm:items-center sm:justify-center sm:text-white
      "
      >
        <a
          className="mr-10 p-2 border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
          md:mr-5
          sm:border-white sm:m-10
          "
          href={"/membership/userProfile"}
          onClick={() => showCon.setShowMenu(false)}
        >
          <p>P R O F I L E</p>
        </a>

        <div
          className="mr-20 p-2 border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
        md:mr-10
        sm:border-white sm:m-10
        "
          onClick={() => showCon.setShowMenu(false)}
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
        >
          <SignOutBtn />
        </div>
      </div>
    );
  }

  function signOutState() {
    return (
      <div
<<<<<<< HEAD
        className={`flex items-center
            sm:flex-col`}
      >
        <div
          className={`my-10
              hover:border-none hover:bg-slate-400 hover:text-white
              `}
        >
          <a
            className="p-2 flex justify-center items-center cursor-pointer border-b border-black
            lg:mx-5"
            href={"/signIn"}
            onClick={() => showCon.setShowMenu(false)}
          >
            <p>S I G N I N</p>
          </a>
        </div>
=======
        className="flex items-center text-gray-700
      sm:flex-col sm:items-center sm:justify-center sm:text-white
      "
      >
        <a
          className="mr-20 p-2 border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium cursor-pointer
          md:mr-10
          sm:border-white sm:m-10
          "
          href="/signIn"
          onClick={() => showCon.setShowMenu(false)}
        >
          <p>S I G N I N</p>
        </a>
>>>>>>> a043a55940df2cc01bf95cf536c60c26cb9da8f9
      </div>
    );
  }

  return <>{signState ? signInState() : signOutState()}</>;
}
