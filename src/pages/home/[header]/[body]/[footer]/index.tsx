import Image from 'next/image';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { IconSvgLocal, TextBase } from '@/components';

const Component = () => {
  return (
    <div className="fade-animation grid grid-flow-row grid-cols-3 gap-12  px-32 tablet:gap-4 mobile:grid-cols-1 mobile:gap-[2px]">
      {/** Left */}
      <div className="grid grid-flow-row grid-cols-3 items-center justify-items-center gap-12 bg-link-50 tablet:gap-4 mobile:gap-[2px]">
        <div className="radius-img img-custom aspect-square mobile:aspect-auto mobile:h-full">
          <Image
            fill
            className="img-inner"
            src="https://images.unsplash.com/photo-1503149779833-1de50ebe5f8a?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          />
        </div>
        <div className="relative col-span-2 aspect-square w-full">
          <div className="radius-img flex flex-col items-center justify-center bg-color-100 p-32 tablet:p-12 mobile:h-1/2 mobile:p-8">
            <TextBase
              className="text-center"
              preset="body-text-16-semibold"
              presetMobile="body-text-12-medium"
              presetTable="body-text-14-semibold"
            >
              + 685 Lorem ipsum
            </TextBase>
            <TextBase
              preset="body-text-16-light"
              presetMobile="body-text-12-light"
              presetTable="body-text-14-light"
              className="mt-12 text-center mobile:mt-4"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare
            </TextBase>
          </div>
          <div className="radius-img -mt-24 flex flex-col items-center  justify-center bg-primary-100 p-32 tablet:mt-0 tablet:p-12 mobile:mt-[2px] mobile:h-1/2 mobile:p-8">
            <TextBase
              className="text-center"
              preset="body-text-16-semibold"
              presetMobile="body-text-12-medium"
              presetTable="body-text-14-semibold"
            >
              + 285 Lorem ipsum
            </TextBase>
            <TextBase
              preset="body-text-16-light"
              presetMobile="body-text-12-light"
              presetTable="body-text-14-light"
              className="mt-12 text-center tablet:mt-4 mobile:mt-4"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare enim
            </TextBase>
          </div>
        </div>
      </div>
      {/** Center */}
      <div className="image-container radius-img">
        <Image
          fill
          className="img-home"
          src="https://images.unsplash.com/photo-1708356476484-ac4797f0dac8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
        />
        <div className="absolute right-[50%] top-0 translate-x-1/2 p-24">
          <div className="rounded-[100%] bg-color-50 p-12">
            <IconSvgLocal name="IC_SETTING" height={28} />
          </div>
        </div>
      </div>
      {/** Right */}
      <div className="grid grid-flow-row grid-cols-3 items-center justify-items-center gap-12 tablet:gap-4 mobile:gap-[2px]">
        <div className="img-custom radius-img col-span-2 aspect-square bg-primary-200">
          <Image
            fill
            className="img-inner"
            src="https://images.unsplash.com/photo-1707581266620-724c2033770c?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          />
          <div className="absolute top-0 flex h-full flex-col justify-between p-16">
            <div className="flex">
              <div className="mr-4 rounded-radius-5xl border-weight-l border-common-1000 px-16 py-4 hover:bg-color-50 tablet:p-4 mobile:p-4">
                <TextBase
                  preset="body-text-16-light"
                  presetMobile="body-text-12-light"
                  presetTable="body-text-12-light"
                  t18n="text:vision"
                  className="text-common-1000 hover:text-common-0"
                />
              </div>
              <div className="rounded-radius-5xl border-weight-l border-common-1000 px-16 py-4 hover:bg-color-50 tablet:p-4 mobile:p-4">
                <TextBase
                  preset="body-text-16-light"
                  presetMobile="body-text-12-light"
                  presetTable="body-text-12-light"
                  t18n="text:mission"
                  className="text-common-1000 hover:text-common-0"
                />
              </div>
            </div>
            <div>
              <div className="rounded-e-radius-m rounded-t-radius-l bg-color-50 px-8 py-12 tablet:py-8">
                <TextBase
                  preset="body-text-16-light"
                  presetMobile="body-text-12-light"
                  presetTable="body-text-12-light"
                  className="text-common-0"
                >
                  Lorem ipsum dolor sit amet, consectetur
                </TextBase>
              </div>
              <div className="-mt-4 w-[80%] rounded-b-radius-l bg-color-50 px-8 pb-12 tablet:pb-8">
                <TextBase
                  preset="body-text-16-light"
                  presetMobile="body-text-12-light"
                  presetTable="body-text-12-light"
                  className="text-common-0"
                >
                  lorem ipsum dolor ipsum dolor
                </TextBase>
              </div>
            </div>
          </div>
        </div>
        <div className="radius-img img-custom aspect-square mobile:aspect-auto mobile:h-full">
          <Image
            fill
            className="img-inner opacity-xl"
            src="https://images.unsplash.com/photo-1708717419552-c40c529df72d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Your Image"
          />
          <div className="absolute top-0 size-full p-16">
            <div className="flex flex-1 justify-end">
              <div className="flex size-24 items-center justify-center rounded-[50%] bg-common-1000">
                <IconSvgLocal height={24} name="IC_ARROW_ITALIC_RIGHT" />
              </div>
            </div>
            <div className="flex flex-1">
              <TextBase
                preset="body-text-16-light"
                presetMobile="body-text-12-light"
                presetTable="body-text-12-light"
                className="mt-8 text-center text-common-1000 tablet:mt-4 mobile:mt-4"
              >
                Lorem ipsum dolor sit amet ipsum dolor sit amet
              </TextBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FooterHome = memo(Component, isEqual);
