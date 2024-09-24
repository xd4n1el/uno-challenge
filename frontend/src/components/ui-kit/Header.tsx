import { memo, ReactElement } from 'react';

import Image from 'next/image';

import UnobjectLogo from '@public/unobject.jpeg';

export enum HeaderVariants {}

const Header = memo((): ReactElement => {
  return (
    <header className="w-full h-16 bg-gray-300 shadow-lg box-border px-6 py-2 flex">
      <div className="w-full max-w-16 h-full flex">
        <Image src={UnobjectLogo} sizes="100%" alt="Unobject Logo" priority />
      </div>

      <h1 className="font-black font-mono text-green-700 text-2xl ml-auto my-auto -tracking-wide">
        ToDo Challenge
      </h1>
    </header>
  );
});

export default Header;
