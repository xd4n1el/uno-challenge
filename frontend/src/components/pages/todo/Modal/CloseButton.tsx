'use client';

import { usePathname, useRouter } from 'next/navigation';
import IconButton from '../../../IconButton';

import CloseIcon from '@/assets/close.icon.svg';

const CloseButton = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const onClose = () => {
    replace(pathname);
  };

  return <IconButton Icon={CloseIcon} variant="RED" onClick={onClose} />;
};

export default CloseButton;
