'use client';
import { useConfirmModal } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

export const ConfirmModal = () => {
  const {
    isOpen,
    onClose,
    title,
    description,
    isLoading,
    onConfirm,
    buttonText,
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-[var(--secondary-500)]"
                >
                  {t(title)}
                </Dialog.Title>
                {!!description && (
                  <div className="mt-2">
                    <p className="text-sm text-[var(--seondary-400)]">{t(description)}</p>
                  </div>
                )}

                <div className="mt-4 w-full flex justify-end gap-4">
                  <button onClick={onClose} disabled={isLoading}>
                    {t('Confirm Modal.Cancel')}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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
                    {t(buttonText)}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
