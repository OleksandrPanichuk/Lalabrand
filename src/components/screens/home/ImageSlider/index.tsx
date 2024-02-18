'use client';

import { SvgIcon } from '@/components/common';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { images } from './ImageSlider.data';
import styles from './ImageSlider.module.scss';

const AUTOPLAY_SPEED = 61111000;

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  const newIndex = (prev: number, payload: number = 1) => {
    return (prev + payload) % images.length;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => newIndex(prevIndex));
    }, AUTOPLAY_SPEED);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => newIndex(prevIndex));
    }, AUTOPLAY_SPEED);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex, -1 + images.length));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex));
  };

  return (
    <div
      className={styles.wrapper}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
        className={styles['slide__current']}
        key={images[currentIndex]}
      >
        <Image
          objectFit="contain"
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          fill
        />
      </motion.div>

      <div className={styles.right}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{  duration: .5 }}
          key={images[newIndex(currentIndex)]}
          className={styles['slide__next']}
        >
          <Image
            src={images[newIndex(currentIndex)]}
            alt={`slide-${newIndex(currentIndex)}`}
            fill
            objectFit="contain"
          />
          
        </motion.div>
        <div className={styles.buttons}>
          <button onClick={handlePrev}>
            <SvgIcon width={82} name="arrow-left" className="fill-black" />
          </button>
          <button onClick={handleNext}>
            <SvgIcon width={82} name="arrow-right" className="fill-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
