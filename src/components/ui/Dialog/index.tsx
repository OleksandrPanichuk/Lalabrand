import { SvgIcon } from '@/components/common';
import { useDisclosure, useSafeContext } from '@/hooks';
import { cn } from '@/lib';
import { Dialog as DialogPrimitive, Transition } from '@headlessui/react';
import {
  Children,
  Fragment,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  isValidElement,
} from 'react';
import {
  IDialogCloseProps,
  IDialogContentProps,
  IDialogContext,
  IDialogProps,
  IDialogTriggerProps,
} from './Dialog.types';

const DialogContext = createContext<IDialogContext>({} as IDialogContext);

export const Dialog = ({
  as = 'div',
  defaultOpen,
  children,
}: PropsWithChildren<IDialogProps>) => {
  const { isOpen, open, close } = useDisclosure(defaultOpen);

  let trigger: ReactNode = null;
  let content: ReactNode = null;
  let rest: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Dialog.Trigger) {
      trigger = child;
    } else if (isValidElement(child) && child.type === Dialog.Content) {
      content = child;
    } else if (isValidElement(child)) {
      rest = child;
    }
  });

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {trigger}
      <Transition appear show={isOpen} as={Fragment}>
        <DialogPrimitive as={as} className="z-[1000] relative" onClose={close}>
          <Dialog.Overlay />
          {content}
          {rest}
        </DialogPrimitive>
      </Transition>
    </DialogContext.Provider>
  );
};

Dialog.Overlay = function Overlay() {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/25" />
    </Transition.Child>
  );
};

Dialog.Trigger = function Trigger({
  children,
  className,
}: PropsWithChildren<IDialogTriggerProps>) {
  const { open } = useSafeContext(DialogContext);
  return cloneElement(children as ReactElement, {
    onClick: open,
    className: cn((children as ReactElement).props.className, className),
  });
};

Dialog.Content = function Content({
  className,
  children,
  ...props
}: IDialogContentProps) {
  const {close, isOpen} = useSafeContext(DialogContext);
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Panel
            className={cn(
              'w-full max-w-[42.5rem] transform overflow-hidden text-center transition-all relative',
              className,
            )}
            {...props}
          >
            {typeof children === 'function'
              ? children({ close, isOpen })
              : children}
          </DialogPrimitive.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

Dialog.Close = function Close({ className, ...props }: IDialogCloseProps) {
  const { close } = useSafeContext(DialogContext);
  return (
    <button
      onClick={close}
      className={cn(
        'absolute top-3 right-3 p-2 z-50 rounded-sm bg-transparent hover:bg-neutral-100 transition-all',
        className,
      )}
      {...props}
    >
      <SvgIcon name="close" width={16} height={16} fill="var(--text-color)" />
    </button>
  );
};

Dialog.Title = DialogPrimitive.Title;
Dialog.Description = DialogPrimitive.Description;
