'use client';
import { useConfirmModal } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib'
import { SvgIcon } from '@/components/common'

export const ConfirmModal = () => {
  const {
    isOpen,
    onClose,
    title,
    description,
    isLoading,
    onConfirm,
  } = useConfirmModal();
  const t = useTranslations();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-[42.5rem] transform overflow-hidden bg-white p-[3.75rem] text-center shadow-xl transition-all relative">
                <button onClick={onClose} className='absolute top-3 right-3 p-2 rounded-sm bg-transparent hover:bg-neutral-100 transition-all' >
                  <SvgIcon name="close" width={16} height={16} fill="var(--text-color)" />
                </button>


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

                <div className={cn('mt-[3.5rem] w-full flex gap-8', !!description && 'mt-[1.875rem]')}>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={onClose}
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
                        onClose();
                      }
                    }}
                    disabled={isLoading}
                  >
                    {/* TODO: show something on loading */}
                    {t('Confirm Modal.Yes')}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
