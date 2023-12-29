"use client";

import { auth } from "src/lib/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function SignOutBtn() {
  const router = useRouter();

  async function signOutHandler() {
    try {
      const url = "/api/signOut";
      const option = { method: "POST" };
      const sessionStop = await fetch("/api/signOut", option);
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      onClick={() => signOutHandler()}
    >
      S I G N O U T
    </button>
  );
}

export default SignOutBtn;
