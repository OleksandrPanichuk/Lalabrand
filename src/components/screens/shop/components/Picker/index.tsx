'use client';
import { useClickOutside, useDisclosure } from '@/hooks';
import {
  ButtonHTMLAttributes,
  ElementRef,
  Fragment,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from 'react';

import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import { Transition } from '@headlessui/react';
import { Slot } from '@radix-ui/react-slot';
import styles from './Picker.module.scss';

interface IPickerContext {
  isOpen: boolean;
  toggle: () => void;
}

interface IPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  withDefaultClassName?: boolean;
  children:
    | ((data: { isOpen: boolean; close: () => void }) => ReactNode)
    | ReactNode;
}

const PickerContext = createContext<IPickerContext>({} as IPickerContext);

export const Picker = ({
  children,
  className,
  withDefaultClassName = true,
  ...props
}: IPickerProps) => {
  const { close, toggle, isOpen } = useDisclosure();

  const contentRef = useRef<ElementRef<'div'>>(null);

  useClickOutside([contentRef], close);

  return (
    <PickerContext.Provider value={{ toggle, isOpen }}>
      <div
        ref={contentRef}
        className={cn(withDefaultClassName && styles.wrapper, className)}
        {...props}
      >
        {typeof children === 'function'
          ? children({ isOpen, close })
          : children}
      </div>
    </PickerContext.Provider>
  );
};

interface IPickerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  withoutChevron?: boolean;
}

Picker.Trigger = function PickerTrigger({
  children,
  className,
  withoutChevron = false,
  ...props
}: PropsWithChildren<IPickerTriggerProps>) {
  const { toggle, isOpen } = useContext(PickerContext);
  return (
    <button
      onClick={toggle}
      className={cn(isOpen && styles['trigger--open'], className)}
      {...props}
    >
      {children}
      {!withoutChevron && <SvgIcon name="chevron" width={10} />}
    </button>
  );
};

Picker.Content = function PickerContent({
  asChild,
  className,
  children,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    asChild?: boolean;
  }
>) {
  const Comp = asChild ? Slot : 'div';
  const { isOpen } = useContext(PickerContext);

  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="transition ease-out duration-150"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-150 "
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Comp
        {...props}
        className={cn(styles.inner, className)}
      >
        {children}
      </Comp>
    </Transition>
  );
};
