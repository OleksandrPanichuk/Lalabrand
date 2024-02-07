'use client';
import { usePathname, useRouter } from '@/shared/navigation';
import { useLocale } from 'next-intl';

import { cn } from '@/lib';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';
import styles from './LanguageSelect.module.scss';

const options = [
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: 'UA',
    value: 'ua',
  },
];

export const LanguageSelect = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const onLanguageChange = (locale: string) => {
    router.push(pathname, { locale });
  };
  return (
    <Listbox value={locale} onChange={onLanguageChange}>
      <div className={'relative'}>
        <Listbox.Button className={'flex  gap-1'}>
          {({ open, value }) => (
            <>
              {options.find((opt) => opt.value === value)?.label}
              <ChevronDown
                className={cn(styles.chevron, open && styles['chevron--open'])}
              />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options
          className={'absolute top-110% border border-solid border-border '}
        >
          {options.map((option, index) => (
            <Fragment key={option.value}>
              <Listbox.Option value={option.value}>
                {({ selected }) => (
                  <span className={cn(selected && 'text-rose-700')}>
                    {option.label}
                  </span>
                )}
              </Listbox.Option>
              {index !== options.length - 1 && (
                <hr className="h-[1px] bg-border" />
              )}
            </Fragment>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
