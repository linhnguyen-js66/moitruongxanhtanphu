import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Slide } from 'react-slideshow-image';

import RECYCLE from '@/assets/image/recycle.png';
import { IconSvgLocal, TextBase } from '@/components';
import { useIntro } from '@/hooks/useIntro';
import useScreenResize from '@/hooks/useScreenResize';

const Component = () => {
  const { t } = useTranslation();
  const { services } = useIntro();
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 5,
    slidesToShow: 5,
  });
  const typeDevice = useScreenResize();

  useEffect(() => {
    if (typeDevice == 'mobile') {
      setConfigShow({
        slidesToScroll: 1,
        slidesToShow: 1,
      });
    }
  }, [typeDevice]);
  const indicators = (index: any) => <div className="indicator_side" key={index} />;

  return (
    <div className="mt-48 w-full">
      <div className="fly px-16">
        <div className="flex w-full items-center justify-evenly mobile:flex-col mobile:justify-center">
          <div className="img-custom w-[30%] mobile:hidden">
            <Image
              src={RECYCLE}
              className="img-inner"
              fill
              loading="lazy"
              placeholder="blur"
              sizes="100vw"
              alt="Môi trường xanh Tân Phú - tiêu huỷ hàng hoá theo yêu cầu"
            />
          </div>
          <div className="w-[30%] tablet:w-1/2 mobile:w-full">
            <div className="mb-32">
              <div className="mb-16 flex w-full items-center">
                <TextBase
                  t18n="text:core_value"
                  className="mr-8"
                  preset="body-text-24-medium"
                  presetMobile="body-text-16-medium"
                />
                <IconSvgLocal name="IC_CORE" height={32} />
              </div>
              <TextBase
                t18n="text:core_note"
                preset="body-text-16-light"
                presetMobile="body-text-14-light"
              />
            </div>
            <div className="mb-32">
              <div className="mb-16 flex w-full items-center">
                <TextBase
                  className="mr-8"
                  preset="body-text-24-medium"
                  presetMobile="body-text-16-medium"
                >
                  {t('text:mission')} - {t('text:vision')}
                </TextBase>
                <IconSvgLocal name="IC_VISION" height={32} />
              </div>
              <TextBase
                t18n="text:core_note"
                preset="body-text-16-light"
                presetMobile="body-text-14-light"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[84px] px-[64px] mobile:px-16">
        <TextBase preset="body-text-24-bold" presetMobile="body-text-18-bold" className="fly">
          {t('text:waste_tech').toUpperCase()}
        </TextBase>
        {services?.length ? (
          <Slide
            slidesToScroll={configShow.slidesToScroll}
            slidesToShow={configShow.slidesToShow}
            indicators={indicators}
            autoplay
            canSwipe
            infinite
            prevArrow={<div />}
            nextArrow={<div />}
            cssClass="fly mt-48"
          >
            {services.map((item, index) => (
              <div
                key={index}
                className={`${index == services?.length - 1 ? 'mr-0' : ''} item-animation mb-16 mr-16 flex h-full items-center justify-between rounded-radius-xxxl border-weight-s p-32 mobile:mr-0`}
              >
                <div className="flex w-full flex-1">
                  <TextBase
                    preset="body-text-16-medium"
                    presetMobile="body-text-14-medium"
                    className="text-color-900"
                  >
                    {item?.service?.toUpperCase()}
                  </TextBase>
                </div>
                {item?.ic && (
                  <div className="aspect-square rounded-[100%] bg-primary-200 p-16">
                    <IconSvgLocal name={item?.ic} height={32} width={32} />
                  </div>
                )}
              </div>
            ))}
          </Slide>
        ) : (
          <div className="mt-48 overflow-x-auto whitespace-nowrap">
            <div className="mr-8 inline-block w-1/3">
              <Skeleton count={3} />
            </div>
            <div className="inline-block w-1/3">
              <Skeleton count={3} />
            </div>
            <div className="ml-8 inline-block w-1/3">
              <Skeleton count={3} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export const Intro = memo(Component, isEqual);
