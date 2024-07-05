import { DialogPanelProps } from '@headlessui/react'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface IDialogContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface IDialogProps {
  defaultOpen?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export interface IDialogCloseProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'children'
  > {}

export interface IDialogContentProps
  extends Omit<DialogPanelProps<'div'>, 'children'> {
  children:
    | ((state: { close: () => void; isOpen: boolean }) => ReactNode)
    | ReactNode;
}

export interface IDialogTriggerProps {
  className?: string;
}
