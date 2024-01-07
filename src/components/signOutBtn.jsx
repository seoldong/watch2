"use client";
import { auth } from "src/lib/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { ShowMenuContext } from '../lib/showMenuContext';


function SignOutBtn() {
  const router = useRouter();
  const showCon = useContext(ShowMenuContext);

  async function signOutHandler() {
    try {
      const url = "/api/signOut";
      const option = { method: "POST" };
      const sessionStop = await fetch(url, option);
      showCon.setShowMenu(true);
      await signOut(auth);
      await router.push('/');
      console.log(showCon);
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <a className="p-2 flex justify-center items-center cursor-pointer border-b border-black
         xl:mx-3 
         md:ml-5"
         onClick={() => signOutHandler()}
      >
        <p>S I G N O U T</p>
      </a>
  );
}

export default SignOutBtn;

