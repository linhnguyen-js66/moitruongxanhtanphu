import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';

import PARTNER1 from '@/assets/image/partner-1.png';
import PARTNER11 from '@/assets/image/partner-11.png';
import PARTNER12 from '@/assets/image/partner-12.png';
import PARTNER12A from '@/assets/image/partner-12a.png';
import PARTNER14 from '@/assets/image/partner-14.png';
import PARTNER15 from '@/assets/image/partner-15.png';
import PARTNER2 from '@/assets/image/partner-2.png';
import PARTNER3 from '@/assets/image/partner-3.png';
import PARTNER4 from '@/assets/image/partner-4.png';
import PARTNER5 from '@/assets/image/partner-5.png';
import PARTNER6 from '@/assets/image/partner-6.png';
import PARTNER6A from '@/assets/image/partner-6a.png';
import PARTNER8 from '@/assets/image/partner-8.png';
import PARTNER9 from '@/assets/image/partner-9.png';
import { ButtonBase, IconSvgLocal, TextBase } from '@/components';
import useScreenResize from '@/hooks/useScreenResize';

const Component = () => {
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 4,
    slidesToShow: 4,
  });
  const typeDevice = useScreenResize();
  const { t } = useTranslation();
  useEffect(() => {
    if (typeDevice == 'mobile') {
      setConfigShow({
        slidesToScroll: 1,
        slidesToShow: 1,
      });
    }
  }, [typeDevice]);
  const indicators = (index: any) => <div className="indicator_side" key={index} />;
  const dataPartner = useMemo(() => {
    return [
      {
        ic: PARTNER1,
      },
      {
        ic: PARTNER2,
      },
      {
        ic: PARTNER3,
      },
      {
        ic: PARTNER4,
      },
      {
        ic: PARTNER5,
      },
      {
        ic: PARTNER6,
      },
      {
        ic: PARTNER6A,
      },
      {
        ic: PARTNER8,
      },
      {
        ic: PARTNER9,
      },
      {
        ic: PARTNER11,
      },
      {
        ic: PARTNER12,
      },
      {
        ic: PARTNER12A,
      },
      {
        ic: PARTNER14,
      },
      {
        ic: PARTNER15,
      },
    ];
  }, []);
  return (
    <div className="mb-32 h-full">
      <div className="mx-32 flex items-center mobile:flex-col mobile:items-start">
        <div className="flex items-center">
          <ButtonBase
            classNames="px-36 h-44 rounded-radius-xxxl hover:shadow-down-s hover:shadow-color-300 body-text-16-regular"
            name="btnProject"
            onClick={() => {}}
            t18n="text:partner"
            type="ghost"
          />
          <div className="ml-16 flex size-36 items-center justify-center rounded-[100%] bg-primary-800">
            <IconSvgLocal
              name="IC_ARROW_RIGHT_OUTLINE"
              height={16}
              width={16}
              fill="rgb(var(--common-1000)"
            />
          </div>
        </div>
        <div className="ml-48 w-1/2 mobile:ml-0 mobile:mt-24 mobile:w-full">
          <TextBase
            preset="body-text-24-regular"
            presetMobile="body-text-16-regular"
            className="text-color-500"
          >
            {t('text:partner_intro')}
            <span className="rounded-radius-5xl bg-primary-200 px-8 py-4">{t('text:intro_2')}</span>
            {t('text:intro_3')}
          </TextBase>
        </div>
      </div>
      <div className="relative mt-[120px]">
        <div className="absolute top-0 w-full">
          <IconSvgLocal name="IC_PARTNER" classNames="w-full mobile:hidden" />
        </div>
        <Slide
          slidesToScroll={configShow.slidesToScroll}
          slidesToShow={configShow.slidesToShow}
          indicators={indicators}
          autoplay
          prevArrow={<div />}
          nextArrow={<div />}
          canSwipe
          infinite
        >
          {dataPartner.map((item, index) => (
            <div key={index} className="flex h-full items-center justify-center">
              <Image
                src={item?.ic}
                placeholder="blur"
                height={100}
                width={200}
                loading="lazy"
                sizes="100vw"
                alt="Đối tác Công ty môi trường xanh Tân Phú tiêu huỷ hàng hoá theo yêu cầu"
              />
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};
export const PartnerCompany = memo(Component, isEqual);
