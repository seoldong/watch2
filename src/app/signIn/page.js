'use client'
import { getRedirectResult, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, provider } from '../../lib/firebase-config';
import SignInLoading from './loading';


function SignInPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const tokenGenerationAndRouter = getRedirectResult(auth)
            .then(async (userCred) => {
                if (!userCred) { setLoading(false); return }
                const token = await userCred.user.getIdToken();
                const url = '/api/signIn';
                const option = {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                }
                const response = await fetch(url, option);
                setLoading(false);
                router.push('/membership/customMenu');
            })
            .catch((error) => {
                console.log(error);
            });
        return () => tokenGenerationAndRouter;
    }, [router])

    function googleSigninBtn(e) {
        e.preventDefault();
        setLoading(false);
        signInWithRedirect(auth, provider)
    }

    return (
        <>
            {loading ?
                <SignInLoading />
                : <div
                    style={{ height: '100%' }}
                    className='flex flex-col'
                >
                    <button
                        style={{ height: '3rem', width: '10rem' }}
                        className="my-5 cursor-pointer border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium tracking-wide"
                        onClick={(e) => googleSigninBtn(e)}
                    >
                        G O O G L E
                    </button>
                    <button
                        style={{ height: '3rem', width: '10rem' }}
                        className="my-5 cursor-pointer border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium tracking-wide"
                    // onClick={(e) => signInBtn(e)}
                    >
                        F A C E B O O K
                    </button>
                    <button
                        style={{ height: '3rem', width: '10rem' }}
                        className="my-5 cursor-pointer border-b border-black hover:border-none hover:bg-slate-400 hover:text-white font-medium tracking-wide"
                    // onClick={(e) => signInBtn(e)}
                    >
                        G I T H U B
                    </button>
                </div>}
        </>
    )
}

export default SignInPage;