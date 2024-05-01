'use client';
import { Link } from '@/shared/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './CategoryCard.module.scss';
import { useMediaQuery } from '@/hooks'
import { cssVariables } from '@/shared/constants'

interface ICategoryCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
  href: string;
  align?: 'vertical'  |'horizontal'
  noflex?:boolean
}

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const CategoryCard = ({
  alt,
  height,
  src,
  width,
  text,
  href,
  align = 'vertical',
  noflex
}: ICategoryCardProps) => {
  const t = useTranslations('Categories');
  return (
    <motion.figure
      whileHover="visible"
      initial="hidden"
      style={{ flex: (!noflex) ?  align === 'horizontal'?  width : height : 'none' }}
      className={styles.wrapper}
    >
      <Image src={src} width={width} height={height} alt={alt} />
      <motion.figcaption variants={variants} className={styles.caption}>
        <Link href={href}>{t(text)}</Link>
      </motion.figcaption>
    </motion.figure>
  );
};
