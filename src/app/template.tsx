'use client';
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/navigation';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

export default function Template({ children }: { children: React.ReactNode }) {

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = async (...args) => {
      handleStart();
      try {
        originalPush(...args);
      } finally {
        handleComplete();
      }
    };

    router.replace = async (...args) => {
      handleStart();
      try {
        originalReplace(...args);
      } finally {
        handleComplete();
      }
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
