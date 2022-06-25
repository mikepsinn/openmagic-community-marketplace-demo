import ConnectWallet from '../ConnectWallet';
import * as React from 'react';

// import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
  return (
    <header className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
      <div className='flex items-center justify-end h-14'>
        {/* <UnstyledLink
          href='/'
          className='font-serif text-lg font-normal hover:text-gray-600'
        >
          OpenMagic
        </UnstyledLink> */}
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            <ConnectWallet />
          </ul>
        </nav>
      </div>
    </header>
  );
}
