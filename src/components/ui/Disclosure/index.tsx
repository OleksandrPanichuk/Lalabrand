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
          {typeof children === 'function' ? children(isOpen, close) : children}
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
      {typeof children === 'function' ? children(isOpen) : children}
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
            open: { opacity: 1, height: 'auto', y: 0 },
            collapsed: { opacity: 0, height: 0, y: -24 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <motion.div
            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
            transition={{ duration: 0.4 }}
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
