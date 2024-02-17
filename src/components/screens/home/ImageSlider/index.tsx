'use client';

import { SvgIcon } from '@/components/common';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { images } from './ImageSlider.data';
import styles from './ImageSlider.module.scss';


const AUTOPLAY_SPEED = 6000;

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
   
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, AUTOPLAY_SPEED);
    
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
      <motion.div
        animate={{
          filter: 'blur(0px)',
        }}
        initial={{
          filter: 'blur(5px)',
        }}
        transition={{duration: 0.5}}
        className={styles['slide__current']}
        key={images[currentIndex]}
      >
        <Image
          objectFit="cover"
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          fill
        />
      </motion.div>

      <div className={styles.right}>
        <motion.div
          animate={{
            filter: 'blur(0px)',
          }}
          initial={{
            filter: 'blur(5px)',
          }}
          transition={{delay: .3}}
          key={images[(currentIndex + 1) % images.length]}
          className={styles['slide__next']}
        >
          <Image
            src={images[(currentIndex + 1) % images.length]}
            alt={`slide-${(currentIndex + 1) % images.length}`}
            fill
            objectFit="cover"
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
