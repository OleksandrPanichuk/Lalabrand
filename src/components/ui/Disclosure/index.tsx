'use client';

import { useClickOutside, useDisclosure, useSafeContext } from '@/hooks';
import { Slot } from '@radix-ui/react-slot';
import { createContext, ElementRef, memo, useEffect, useRef } from 'react';
import {
  IDisclosureContentProps,
  IDisclosureContext,
  IDisclosureTriggerProps,
  TypeDisclosureComponent,
} from './Disclosure.types';

import { AnimatePresence, motion } from 'framer-motion';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import styles from './Disclosure.module.scss';

const DisclosureContext = createContext<IDisclosureContext>(
  {} as IDisclosureContext,
);

export const Disclosure = memo(
  ({
    isOpen: isDisclosureOpen = false,
    onOpenChange,
    children,
    closeOnOutsideClick = false,
    className,
    ...props
  }) => {
    const { isOpen, open, close, toggle, setIsOpen } =
      useDisclosure(isDisclosureOpen);
    const ref = useRef<ElementRef<'div'>>(null);

    useClickOutside([ref], () => closeOnOutsideClick && close());

    useEffect(() => {
      onOpenChange?.(isOpen);
      // В жодному разі не додавати onOpenChange до залежностей useEffect
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
      setIsOpen(isDisclosureOpen);
    }, [isDisclosureOpen, setIsOpen]);

    return (
      <DisclosureContext.Provider value={{ isOpen, open, close, toggle }}>
        <div className={cn(styles.wrapper, className)} ref={ref} {...props}>
          {typeof children === 'function' ? children({isOpen, close}) : children}
        </div>
      </DisclosureContext.Provider>
    );
  },
) as TypeDisclosureComponent;

Disclosure.displayName = 'Disclosure';

Disclosure.Trigger = function Trigger({
  children,
  onClick,
  className,
  ...props
}: IDisclosureTriggerProps) {
  const { toggle, isOpen } = useSafeContext(DisclosureContext);

  return (
    <button
      className={cn(
        styles.trigger,
        isOpen && styles['trigger--open'],
        className,
      )}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      {...props}
    >
      {typeof children === 'function' ? children({isOpen}) : children}
      <SvgIcon name="chevron" width={10} />
    </button>
  );
};

Disclosure.Content = function Content({
  children,
  asChild,
  className,
  ...props
}: IDisclosureContentProps) {
  const { isOpen } = useSafeContext(DisclosureContext);

  const Component = asChild ? Slot : 'div';

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: {
              height: 'auto',
              opacity: 1,
              display: 'flex',
              y: 0,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            },
            collapsed: {
              height: 0,
              opacity: 0,
              y: -24,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.1,
                },
              },
              transitionEnd: {
                display: 'none',
              },
            },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <motion.div
            className="w-full"
          >
            <Component className={cn(styles.content, className)} {...props}>
              {children}
            </Component>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
