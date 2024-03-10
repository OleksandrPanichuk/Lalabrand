'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import css from './SignAside.module.scss';

const images = {
  signin: {
    alt: [
      'women dressed in a shirt',
      'guy in a T-shirt and sunglasses',
      'child in a plain suit with a collar and flesh-colored boots',
    ],
  },
  signup: {
    alt: [
      'girl in a hat with a curved brim, trousers and a long sleeves shirt',
      'guy in a T-shirt with cap in a hand',
      'girl with a x-crossed shoulder straps',
    ],
  },
};

export const SignAside = () => {
  const pathname = usePathname();

  function getImagePath() {
    if (pathname.includes('signin')) {
      return 'signin';
    }
    if (pathname.includes('signup')) {
      return 'signup';
    }
  }

  function getImageAlt(index: number) {
    if (pathname.includes('signin')) {
      return images.signin.alt[index];
    }
    if (pathname.includes('signup')) {
      return images.signup.alt[index];
    }
    return 'example of our products';
  }

  return (
    <div className={css.aside}>
      <Image
        src={`/images/${getImagePath()}/image 59.jpg`}
        height={288}
        width={345}
        unoptimized
        alt={getImageAlt(0)}
      />
      <Image
        src={`/images/${getImagePath()}/image 60.jpg`}
        height={288}
        width={565}
        unoptimized
        className={css.jc_center}
        alt={getImageAlt(1)}
      />
      <Image
        src={`/images/${getImagePath()}/image 61.jpg`}
        height={288}
        width={433}
        unoptimized
        alt={getImageAlt(2)}
      />
    </div>
  );
};
