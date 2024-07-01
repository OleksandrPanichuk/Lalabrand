import { Dialog } from '@/components/ui';
import Image, { ImageProps } from 'next/image';
import { PropsWithChildren } from 'react';

interface IImagePreviewModalProps
  extends Omit<ImageProps, 'fill' | 'objectFit'> {}

export const ImagePreviewModal = ({
  children,
  src,
  alt,
  ...props
}: PropsWithChildren<IImagePreviewModalProps>) => {
  return (
    <Dialog>
      <Dialog.Trigger className="cursor-pointer">
        {children}
      </Dialog.Trigger>
      <Dialog.Content className="max-w-none">
        <Dialog.Close />
        <div className="relative w-full h-[90vh]">
          <Image src={src} alt={alt} fill objectFit={'contain'} {...props} />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
