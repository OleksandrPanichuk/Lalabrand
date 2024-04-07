"use client"
import { useTranslations } from 'next-intl';
import styles from './page.module.scss';

const LegalPrivacyPage = () => {
  const t = useTranslations('Legal Privacy');
  return (
    <div className={styles.wrapper}>
      <h2>{t('Title')}</h2>
      <pre>{t('Text')}</pre>
      <div>
        <h5>{t('List.Title')}</h5>
        <ul>
          {new Array(6).fill(0).map((_, index) => (
            <li key={index}>
              <h6>{t(`List.Items.${index + 1}.Question`)}</h6>
              <p>{t(`List.Items.${index + 1}.Answer`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LegalPrivacyPage;
