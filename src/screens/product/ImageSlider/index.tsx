'use client';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import 'swiper/css';
import styles from './ImageSlider.module.scss';

import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';

const SLIDES_PER_VIEW = 3;

interface IImageSliderProps {
  images: string[];
}

export const ImageSlider = ({ images }: IImageSliderProps) => {
  //Index of main image(the biggest one)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'top' | 'down'>('down');

  const [swiper, setSwiper] = useState<SwiperClass>();

  const newIndex = (prev: number, payload: number = 1) => {
    return (prev + payload) % images.length;
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex, -1 + images.length));
    setDirection('top');
    swiper?.slidePrev();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => newIndex(prevIndex));
    setDirection('down');
    swiper?.slideNext();
  };

  const settings: SwiperProps = {
    direction: 'vertical',
    slidesPerView: SLIDES_PER_VIEW,
    draggable: false,
    speed: 0,
    spaceBetween: 8,
    height: 829,
    loop: true,
    initialSlide: 1,
    noSwiping: true,
    noSwipingClass: 'swiper-slide'
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <Swiper {...settings} onSwiper={setSwiper} className={styles.slider}>
          {images.map((slide, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Image
                src={slide}
                alt={`product-image-${index + 1}`}
                fill
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
            <SvgIcon
              name="arrow-right"
              className="rotate-180"
              width={82}
              fill="black"
            />
          </button>
          <button onClick={handleNext}>
            <SvgIcon name="arrow-right" width={82} fill="black" />
          </button>
        </div>
      </div>
    </div>
  );
};
