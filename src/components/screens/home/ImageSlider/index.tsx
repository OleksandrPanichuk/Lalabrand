'use client';

import { SvgIcon } from '@/components/common'
import { cn } from '@/lib'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { images } from './ImageSlider.data'
import styles from './ImageSlider.module.scss'

const AUTOPLAY_SPEED = 6000;

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('left');

  const intervalRef = useRef<NodeJS.Timeout>();

  const newIndex = (prev: number, payload: number = 1) => {
    return (prev + payload) % images.length;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => newIndex(prevIndex));
      setDirection('left');
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
      setDirection('left');
    }, AUTOPLAY_SPEED);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex, -1 + images.length));
    setDirection('right');
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex));
    setDirection('left');
  };

  return (
    <div
      className={styles.wrapper}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
    >
      <div className={styles['slide-current']}>
        <motion.img
          className={cn(styles['slide-current__image'], 'z-20')}
          transition={{ duration: 1 }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
        />
      
        <motion.img
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          alt={`behind-slide`}
          transition={{ duration: 1 }}
          className={cn(styles['slide-current__image'], 'z-10')}
          src={direction === 'right'
          ? images[newIndex(currentIndex)]
          : images[newIndex(currentIndex, -1 + images.length)]}
        />
      </div>

      <div className={styles.right}>
        <div className={styles['slide-next']}>
          <motion.img
            className={cn(styles['slide-next__img'], 'z-20')}
            transition={{ duration: 1 }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            key={currentIndex + Math.random()}
            src={images[newIndex(currentIndex)]}
            alt={`slide-${newIndex(currentIndex)}`}
          />
          <motion.img
            className={cn(styles['slide-next__img'], 'z-10')}
            transition={{ duration: 1 }}
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            key={currentIndex + Math.random()}
            src={
              direction === 'right'
                ? images[newIndex(currentIndex + 1)]
                : images[newIndex(currentIndex - 1)]
            }
            alt={`behind-slide`}
          />
        </div>
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
