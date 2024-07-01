'use client';

import { Disclosure } from '@/components/ui';
import { TypeProductItem } from '@/shared/types';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import styles from './ProductDisclosures.module.scss';

type DisclosureTypes = 'description' | 'materials' | 'care-guide';

interface IProductDisclosureProps {
  data: TypeProductItem;
}

export const ProductDisclosures = ({ data }: IProductDisclosureProps) => {
  const t = useTranslations('Product');

  const [type, setType] = useState<DisclosureTypes>();

  const handleOpenChange = useCallback((disclosureType: DisclosureTypes) => {
    return (isOpen: boolean) => {
      if (isOpen) {
        setType(disclosureType);
      } else {
        setType((prev) => (prev === disclosureType ? undefined : prev));
      }
    };
  }, []);
  const { description, materials, careGuide } = data;

  const hasDescriptionInfo =
    !!description && Object.values(description).some((el) => !!el);
  const hasMaterialsInfo =
    !!materials && Object.values(materials).some((el) => !!el);
  const hasCareGuideInfo =
    !!careGuide && Object.values(careGuide).some((el) => !!el);

  if (!hasDescriptionInfo && !hasMaterialsInfo && !hasCareGuideInfo)
    return null;

  return (
    <div className={styles.wrapper}>
      {hasDescriptionInfo && (
        <Disclosure
          isOpen={type === 'description'}
          onOpenChange={handleOpenChange('description')}
        >
          <Disclosure.Trigger className={styles.description__trigger}>
            {t('Description & fit.Title')}
          </Disclosure.Trigger>
          <Disclosure.Content className={styles.description__content}>
            {description.longDescription && (
              <p>{description.longDescription}</p>
            )}
            {description.modelSize && (
              <p>
                <span>{t('Description & fit.Model size')}:</span>{' '}
                {description.modelSize}
              </p>
            )}
            {description.length && (
              <p>
                <span>{t('Description & fit.Length')}:</span>{' '}
                {description.length}
              </p>
            )}
            {description.sleeveLength && (
              <p>
                <span>{t('Description & fit.Sleeve length')}:</span>{' '}
                {description.sleeveLength}
              </p>
            )}
            {description.fit && (
              <p>
                <span>{t('Description & fit.Fit')}:</span> {description.fit}
              </p>
            )}
            {description.neckline && (
              <p>
                <span>{t('Description & fit.Neckline')}:</span>{' '}
                {description.neckline}
              </p>
            )}
          </Disclosure.Content>
        </Disclosure>
      )}
      {hasMaterialsInfo && (
        <Disclosure
          isOpen={type === 'materials'}
          onOpenChange={handleOpenChange('materials')}
        >
          <Disclosure.Trigger>{t('Materials.Title')}</Disclosure.Trigger>
          <Disclosure.Content className={styles.materials__content}>
            {materials.composition && (
              <p>
                <span>{t('Materials.Composition')}:</span>{' '}
                {materials.composition}
              </p>
            )}
            {materials.material && (
              <p>
                <span>{t('Materials.Material')}:</span> {materials.material}
              </p>
            )}
            {materials.description && <p>{materials.description}</p>}
          </Disclosure.Content>
        </Disclosure>
      )}
      {hasCareGuideInfo && (
        <Disclosure
          isOpen={type === 'care-guide'}
          onOpenChange={handleOpenChange('care-guide')}
        >
          <Disclosure.Trigger>{t('Care Guide.Title')}</Disclosure.Trigger>
          <Disclosure.Content className={styles['care-instructions__content']}>
            {!!careGuide.instructions?.length && (
              <div>
                <p>{t('Care Guide.Instructions')}:</p>
                <ul>
                  {careGuide.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}
            {careGuide.description && <p>{careGuide.description}</p>}
          </Disclosure.Content>
        </Disclosure>
      )}
    </div>
  );
};
