'use client';


import { Routes } from '@/shared/constants'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import css from './AuthAside.module.scss'


type Status = '' | 'checkEmail' | 'resetPassword'

export const AuthAside = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const page = pathname.includes('sign-in') ? 'sign-in' : 'sign-up';


  const status: Status  = useMemo(() => {
    if(pathname.includes(Routes.FORGOT_PASSWORD)) {
      return 'checkEmail'
    }

    if(pathname.includes(Routes.RESET_PASSWORD)) {
      return 'resetPassword';
    }

    return ''
  }, [pathname])

  function getImageAlt(index: number) {
    if (status) {
      return t(`Auth.Alt.resetPassword.${index}`);
    }

    return t(`Auth.Alt.${page}.${index}`);
  }

  function getImagePath() {
    return status ? `/images/resetPassword` : `/images/${page}`;
  }

  return (
    <div className={css.aside}>
      <Image
        src={`${getImagePath()}/image 59.jpg`}
        height={288}
        width={345}
        unoptimized
        alt={getImageAlt(0)}
      />
      <Image
        src={`${getImagePath()}/image 60.jpg`}
        height={288}
        width={565}
        unoptimized
        className={css.jc_center}
        alt={getImageAlt(1)}
      />
      <Image
        src={`${getImagePath()}/image 61.jpg`}
        height={288}
        width={433}
        unoptimized
        alt={getImageAlt(2)}
      />
    </div>
  );
};
