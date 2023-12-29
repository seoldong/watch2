"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOutBtn from "./signOutBtn";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase-config";
import { ShowMenuContext } from "../lib/showMenuContext";

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
        >
          <SignOutBtn />
        </div>
      </div>
    );
  }

  function signOutState() {
    return (
      <div
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
      </div>
    );
  }

  return <>{signState ? signInState() : signOutState()}</>;
}
