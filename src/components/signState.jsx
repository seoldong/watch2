"use client";
import { useRouter } from "next/navigation";
import SignOutBtn from "./signOutBtn";
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
    return () => checkSignState();
  }, [router]);

  function signInState() {
    return (
      <div
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
        >
          <SignOutBtn />
        </div>
      </div>
    );
  }

  function signOutState() {
    return (
      <div
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
      </div>
    );
  }

  return <>{signState ? signInState() : signOutState()}</>;
}
