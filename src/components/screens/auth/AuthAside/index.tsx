'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import css from './AuthAside.module.scss';
import { useResetPasswordStore } from '@/store';

export const AuthAside = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { status } = useResetPasswordStore();
  const page = pathname.includes('signin') ? 'signin' : 'signup';

  function getImageAlt(index: number) {
    if (page === 'signin' && status) {
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
