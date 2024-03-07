import { memo } from 'react';
import isEqual from 'react-fast-compare';

const Component = () => {
  return (
    <div className="relative mt-[120px] mobile:mt-32">
      <div className="flex w-full items-center justify-center mobile:hidden">
        <div className="-mr-48 ml-48 aspect-square size-[15%] rounded-[100%] border-weight-m border-color-300 tablet:-mr-32 mobile:-mr-24" />
        <div className="-mr-48 aspect-square size-[30%] rounded-[100%] border-weight-m border-color-300 tablet:-mr-32 mobile:-mr-24" />
        <div className="aspect-square size-[25%] rounded-[100%] border-weight-m border-color-300" />
      </div>
      <div>{}</div>
    </div>
  );
};
export const AboutCompany = memo(Component, isEqual);
