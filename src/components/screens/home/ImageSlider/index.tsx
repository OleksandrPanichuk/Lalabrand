'use client';

import { SvgIcon } from '@/components/common';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { images } from './ImageSlider.data';
import styles from './ImageSlider.module.scss';

const AUTOPLAY_SPEED = 3000;

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, AUTOPLAY_SPEED);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, AUTOPLAY_SPEED);
    }
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
    >
      <div className={styles['slide__current']}>
        <Image  objectFit='cover' src={images[currentIndex]} alt={`slide-${currentIndex}`} fill />
      </div>

      <div className={styles.right}>
        <div className={styles['slide__next']}>
          <Image
            src={images[(currentIndex + 1) % images.length]}
            alt={`slide-${(currentIndex + 1) % images.length}`}
            fill
            objectFit='cover'
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handlePrev}>
            <SvgIcon width={82} name="arrow-left" className="fill-black" />
          </button>
          <button onClick={handleNext}>
            <SvgIcon width={82} name="arrow-right"  className="fill-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
