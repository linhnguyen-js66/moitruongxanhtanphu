import Image from 'next/image';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

import IC_CUSTOMER from '@/assets/image/ic-customer.webp';
import { TextBase } from '@/components';

const Component = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="relative aspect-square overflow-hidden rounded-[100%] bg-primary-50 shadow-down-m shadow-color-100">
        <Image width={64} height={64} src={IC_CUSTOMER} alt="Your Image" />
      </div>
      <div className="ml-12 rounded-radius-4xl bg-color-50 p-16 shadow-down-m shadow-color-100">
        <div className="flex items-center">
          <TextBase
            t18n="text:tanphu"
            className="text-primary-500"
            preset="body-text-16-semibold"
          />
          ,
          <div className="w-8" />
          <TextBase t18n="text:hello" className="text-color-600" preset="body-text-16-regular" />
        </div>
        <div>
          <TextBase t18n="text:support" className="text-color-600" preset="body-text-14-light" />
        </div>
      </div>
    </div>
  );
};

export const CustomerSupport = memo(Component, isEqual);
