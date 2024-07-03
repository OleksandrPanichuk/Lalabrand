'use client';
import { SvgIcon, Title, Visibility } from '@/components/common';
import { cn } from '@/lib';
import { cssVariables } from '@/shared/constants';
import { Link } from '@/shared/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CategoryType, categoryPreviewData } from './CategoryPreview.data';
import styles from './CategoryPreview.module.scss';

export const CategoryPreview = () => {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('WOMEN');

  return (
    <section>
      <Title
        className="page__container"
        pronoun={t('Titles.Our')}
        name={t('Titles.Categories')}
      />
      <div className={styles.content}>
        <Visibility
          fallback
          ssr
          breakpoint={`(min-width: ${cssVariables.screenMd})`}
        >
          <div className={styles['image-left']}>
            <AnimatePresence>
              {Object.entries(categoryPreviewData).map(
                ([key, value]) =>
                  key === activeCategory && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      exit={{ opacity: 0 }}
                      key={key}
                      src={value.imageLeft}
                      alt={`category-${key.toLowerCase()}`}
                    />
                  ),
              )}
            </AnimatePresence>
          </div>
        </Visibility>
        <ul className={styles.list}>
          {Object.entries(categoryPreviewData).map(([key, value]) => (
            <li
              onMouseOver={() => setActiveCategory(key as CategoryType)}
              key={key}
            >
              <Link
                href={value.link}
                className={cn(
                  key === activeCategory && styles.active,
                  key === 'SALE' && styles.sale,
                )}
              >
                {t(value.key)}
                <SvgIcon
                  name="arrow-top-right"
                  width={21}
                  height={23}
                  fill="black"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Visibility
          fallback
          ssr
          breakpoint={`(min-width: ${cssVariables.screenMd})`}
        >
          <div className={styles['image-right']}>
            <AnimatePresence>
              {Object.entries(categoryPreviewData).map(
                ([key, value]) =>
                  key === activeCategory && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      exit={{ opacity: 0 }}
                      key={key}
                      src={value.imageRight}
                      alt={`category-${key.toLowerCase()}`}
                    />
                  ),
              )}
            </AnimatePresence>
          </div>
        </Visibility>
      </div>
    </section>
  );
};
