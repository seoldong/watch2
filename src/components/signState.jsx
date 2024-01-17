"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase-config";
import { ShowMenuContext } from "../lib/showMenuContext";

// sm > nav > signIn 이동 후 깜박임 있음

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
    return () => checkSignState();W
  }, [router]);


  async function signOutHandler() {
    try {
      const url = "/api/signOut";
      const option = { method: "POST" };
      const sessionStop = await fetch(url, option);
      showCon.setShowMenu(true);
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  function signInState() {
    return (
      <div
        className={`flex items-center
        sm:flex-col`}
      >
        <div>
          <a
            className="p-2 flex justify-center items-center ml-10 cursor-pointer border-b border-black
            2xl:ml-10 2xl:text-lg
            xl:text-lg
            lg:mx-5 lg:text-xl
            sm:m-10
            hover:border-none hover:bg-slate-400 hover:text-white
            "
            href={"/membership/userProfile"}
            onClick={() => showCon.setShowMenu(false)}
          >
            <span>P R O F I L E</span>
          </a>
        </div>

        <div className={`sm:my-10`}>
          <a
            className="p-2 flex justify-center items-center ml-10 cursor-pointer border-b border-black
            2xl:ml-10 2xl:text-lg
            xl:text-lg
            lg:mx-5 lg:text-xl
            sm:m-10
            hover:border-none hover:bg-slate-400 hover:text-white
            "
            onClick={() => signOutHandler()}
          >
            <span>S I G N O U T</span>
          </a>
        </div>
      </div>
    );
  }

  function signOutState() {
    return (
      <div className="flex justify-center items-center">
        <a
          className="p-2 flex justify-center items-center ml-10 cursor-pointer border-b border-black
            2xl:ml-10 2xl:text-xl
            xl:text-xl
            lg:mx-5 lg:text-xl
            md:m-0
            sm:m-10
            hover:border-none hover:bg-slate-400 hover:text-white
            "
          href={"/signIn"}
          onClick={() => showCon.setShowMenu(false)}
        >
          <span>S I G N I N</span>
        </a>
      </div>
    );
  }

  return <>{signState ? signInState() : signOutState()}</>;
}
