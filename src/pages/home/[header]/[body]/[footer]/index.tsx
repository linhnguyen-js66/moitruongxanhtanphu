import Image from 'next/image';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

const Component = () => {
  return (
    <div className="grid grid-flow-row grid-cols-3 gap-12 px-32 mobile:grid-cols-1 mobile:gap-0">
      {/** Left */}
      <div className="grid grid-flow-row grid-cols-3 items-center justify-items-center gap-12 mobile:gap-0">
        <div className="radius-img img-custom aspect-square mobile:aspect-auto">
          <Image
            fill
            className="img-inner"
            src="https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          />
        </div>
        <div className="radius-img col-span-2 aspect-square size-full  bg-primary-200">
          <div>khasdkjfhaskfhasdkjfhdsakjfhksdj</div>
          {/* <Image
            fill
            className="img-inner"
            src="https://plus.unsplash.com/premium_photo-1675362696408-19eb8ba38823?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          /> */}
        </div>
      </div>
      {/** Center */}
      <div className="image-container radius-img row-span-2 mobile:col-span-2">
        <Image
          fill
          className="img-home"
          src="https://images.unsplash.com/photo-1708769915551-2f4a13f4b9e3?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
        />
      </div>
      {/** Right */}
      <div className="grid grid-flow-row grid-cols-3 items-center justify-items-center gap-12 mobile:gap-0">
        <div className="img-custom radius-img col-span-2 aspect-square bg-primary-200">
          <Image
            fill
            className="img-inner"
            src="https://plus.unsplash.com/premium_photo-1675362696408-19eb8ba38823?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          />
        </div>
        <div className="radius-img img-custom aspect-square mobile:aspect-auto">
          <Image
            fill
            className="img-inner"
            src="https://images.unsplash.com/photo-1514621166532-aa7eb1a3a2f4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          />
        </div>
      </div>
      {/** */}
      {/* <div className="bg-primary-500">4</div>
      <div className="radius-img img-custom aspect-square mobile:aspect-auto">
        <Image
          fill
          className="img-inner"
          src="https://images.unsplash.com/photo-1514621166532-aa7eb1a3a2f4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
        />
      </div> */}
    </div>
  );
};
export const FooterHome = memo(Component, isEqual);
