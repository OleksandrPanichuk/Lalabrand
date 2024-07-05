'use client';
import { PropsWithChildren } from 'react';
import { Dialog } from '@/components/ui';

export const SizeGuideModal = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className={'bg-white p-[3.75rem] shadow-xl'}>
        <Dialog.Close />
        <Dialog.Title>Size Guide</Dialog.Title>
      </Dialog.Content>
    </Dialog>
  );
};
