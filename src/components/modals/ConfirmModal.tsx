'use client';
import { Button, Dialog } from '@/components/ui';
import { cn } from '@/lib';
import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';

interface IConfirmModalProps {
  title?: string;
  description?: string;
  isLoading?: boolean;
  onConfirm?: () => void | Promise<void>;
}

const defaultData: IConfirmModalProps = {
  title: 'Confirm Modal.Title',
  description: 'Confirm Modal.Description',
};

export const ConfirmModal = ({
  title = defaultData['title'],
  description = defaultData['description'],
  isLoading,
  onConfirm,
  children,
}: PropsWithChildren<IConfirmModalProps>) => {
  const t = useTranslations();

  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        {({close}) => (
          <>
            <Dialog.Close />
            <Dialog.Title
              as="h3"
              className="text-lg font-semibold font-montserrat text-[var(--secondary-500)]"
            >
              {t(title)}
            </Dialog.Title>
            {!!description && (
              <div className="mt-2">
                <p className="text-sm text-[var(--secondary-400)]">
                  {t(description)}
                </p>
              </div>
            )}

            <div
              className={cn(
                'mt-[3.5rem] w-full flex gap-8',
                !!description && 'mt-[1.875rem]',
              )}
            >
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={close}
                disabled={isLoading}
              >
                {t('Confirm Modal.No')}
              </Button>
              <Button
                className="w-full"
                size="lg"
                onClick={async () => {
                  try {
                    await onConfirm?.();
                  } finally {
                    close();
                  }
                }}
                disabled={isLoading}
              >
                {t('Confirm Modal.Yes')}
              </Button>
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog>
  );
};
