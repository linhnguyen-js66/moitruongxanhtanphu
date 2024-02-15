import { Button, Carousel } from 'antd';
import Image from 'next/image';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import CoverSecond from 'src/assets/image/img-cover-second.png';
import CoverFirst from 'src/assets/image/img-cover.png';

import { TextBase, TextStroke } from '@/components';

import { ListIntro } from './[intro]/[list-intro]';

const Component = () => {
  const { t } = useTranslation();
  const renderTitle = useCallback(() => {
    return (
      <div className="absolute inset-0 flex items-start justify-start">
        <TextStroke
          text={t('text:recycle').toUpperCase()}
          className="h-[100px] tablet:h-[84px] mobile:h-[62px]"
        />
      </div>
    );
  }, [t]);
  const renderContent = useCallback(() => {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-3/4">
          {renderTitle()}
          <div className="ml-[72px] py-[48px] tablet:ml-24 mobile:ml-0 mobile:py-40">
            <TextBase
              t18n="text:company"
              presetMobile="h4"
              presetTable="h2"
              className="h1 text-text-primary"
            />
            <div className="mt-28 flex h-full w-[60%] items-center tablet:w-[100%]  mobile:mt-12 mobile:w-[100%]">
              <div className="mr-24 h-[72px] w-[9px] bg-primary-700 tablet:h-48 tablet:w-[6px] mobile:mr-12 mobile:h-36 mobile:w-4" />
              <TextBase
                t18n="text:des_company"
                className="body-text-24-regular text-color-800"
                presetTable="body-text-16-regular"
                presetMobile="body-text-12-regular"
              />
            </div>
            <Button
              type="text"
              className="mt-48 h-48 rounded-radius-none bg-primary-500 hover:bg-color-transparent tablet:mt-28 tablet:h-32 mobile:mt-24 mobile:h-28"
              name="contactNow"
              onClick={() => {}}
            >
              <TextBase
                className="text-color-50"
                t18n="text:contact_now"
                preset="body-text-16-bold"
                presetMobile="body-text-14-bold "
              />
            </Button>
          </div>
        </div>
        <div />
      </div>
    );
  }, [renderTitle]);
  return (
    <div className="relative pb-[188px] mobile:pb-[134px]">
      <div>
        <Carousel speed={3000} autoplay effect="fade" className="relative">
          <div className="relative flex w-full items-center">
            <Image src={CoverFirst} alt="Công ty TNHH môi trường xanh Tân phú" />
            {renderContent()}
          </div>
          <div className="relative flex w-full items-center">
            <Image
              alt="Công ty TNHH môi trường xanh Tân phú"
              src={CoverSecond}
              className="w-full cursor-pointer"
            />
            {renderContent()}
          </div>
        </Carousel>
        <div className="absolute bottom-0 w-[100%]">
          <div className="flex w-full justify-center">
            <ListIntro />
          </div>
        </div>
      </div>
    </div>
  );
};
export const HomePage = memo(Component, isEqual);
