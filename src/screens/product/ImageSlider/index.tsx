'use client';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { getSlides } from './ImageSlider.helpers';
import styles from './ImageSlider.module.scss';

interface IImageSliderProps {
  images: string[];
}

export const ImageSlider = ({ images }: IImageSliderProps) => {
  //Index of main image(the biggest one)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [direction, setDirection] = useState<'top' | 'down'>('down');

  const newIndex = (prev: number, payload: number = 1) => {
    return (prev + payload) % images.length;
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex, -1 + images.length));
    setDirection('top');
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex));
    setDirection('down');
  };

  const slides = getSlides(currentIndex, images);

  

  return (
    <div className={styles.wrapper}>
      <div>
        {slides.map((slide, index) => (
          <div key={slide}>
            <Image
              src={slide}
              alt={`product-image-${index + 1}`}
              width={181}
              height={271}
            />
          </div>
        ))}
      </div>

      <div>
        <div className={styles['big-image']}>
          <motion.img
            className={cn(styles['big-image_img'], 'z-20')}
            transition={{ duration: 1 }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`front-image`}
          />

          <motion.img
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            alt={`behind-image`}
            transition={{ duration: 1 }}
            className={cn(styles['big-image_img'], 'z-10')}
            src={
              direction === 'top'
                ? images[newIndex(currentIndex)]
                : images[newIndex(currentIndex, -1 + images.length)]
            }
          />
        </div>

        <div className={styles.arrows}>
          <button onClick={handlePrev}>
            <SvgIcon name="arrow-right" className="rotate-180" width={82} fill='black' />
          </button>
          <button onClick={handleNext}>
            <SvgIcon name="arrow-right" width={82} fill='black' />
          </button>
        </div>
      </div>
    </div>
  );
};
