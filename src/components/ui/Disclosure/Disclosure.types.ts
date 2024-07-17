import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MemoExoticComponent,
  ReactNode,
} from 'react';

export interface IDisclosureProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnOutsideClick?: boolean;

  children:
    | ((props: { isOpen: boolean; close: () => void }) => ReactNode)
    | ReactNode;
}

export type TypeDisclosureComponent = MemoExoticComponent<
  (props: IDisclosureProps) => JSX.Element
> & {
  Trigger: (props: IDisclosureTriggerProps) => JSX.Element;
  Content: (props: IDisclosureContentProps) => JSX.Element;
};

export interface IDisclosureContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface IDisclosureTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ((props: { isOpen: boolean }) => ReactNode) | ReactNode;
}

export interface IDisclosureContentProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}
