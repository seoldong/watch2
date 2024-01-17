"use client";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth, provider } from "../../lib/firebase-config";


export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const userCred = await getRedirectResult(auth);
        if (userCred) {
          const token = await userCred.user.getIdToken();
          const url = "/api/signIn";
          const option = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          await fetch(url, option);
          router.push("/membership/customMenu");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleRedirect();
  }, [router]);
  

  function googleSigninBtn() {
    signInWithRedirect(auth, provider).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {
        <div
          className="h-full w-[100%] flex flex-col
        2xl:text-4xl 2xl:mt-10
        xl:text-4xl xl:mt-10
        lg:text-3xl
        md:text-2xl
        sm:text-2xl
        "
        >
          <button
            className="my-5 p-2 cursor-pointer border-b border-black 
            hover:border-none hover:bg-slate-400 hover:text-white font-medium
            lg:p-5"
            onClick={(e) => googleSigninBtn()}
          >
            G O O G L E
          </button>
          {/* <button
            className="h-12 w-40 my-5 cursor-pointer border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium tracking-wide"
            onClick={(e) => signInBtn(e)}
          >
            F A C E B O O K
          </button>
          <button
            className="h-12 w-40 my-5 cursor-pointer border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium tracking-wide"
            onClick={(e) => signInBtn(e)}
          >
            G I T H U B
          </button> */}
        </div>
      }
    </>
  );
}
