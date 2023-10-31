'use client'

import { useRouter } from 'next/navigation';
import DefaultMenu from '../../component/guest/defaultMenu';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [signInState, setSignInState] = useState(true);

  useEffect(() => {
    if (signInState) {
      router.push('/membership/defaultMenu/tomorrowMid');
    }
  }, [signInState]);

  return <><DefaultMenu /></>;
}


