import { memo, useEffect, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Slide } from 'react-slideshow-image';

import type { IconSvgTypes } from '@/assets/svg';
import { ButtonBase, IconSvgLocal, TextBase } from '@/components';
import useScreenResize from '@/hooks/useScreenResize';

const Component = () => {
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 4,
    slidesToShow: 4,
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
  const indicators = (index: any) =>
    typeDevice == 'mobile' ? <div className="indicator_side" key={index} /> : <div />;
  const dataPartner = useMemo(() => {
    return [
      {
        ic: 'IC_PARTNER_1',
      },
      {
        ic: 'IC_PARTNER_2',
      },
      {
        ic: 'IC_PARTNER_3',
      },
      {
        ic: 'IC_PARTNER_4',
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
            className="line-clamp-2 text-color-500"
          >
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo
            <span className="rounded-radius-5xl bg-primary-200 px-8 py-4">conUt enim</span>
            ad minim
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
          autoplay={false}
          prevArrow={<div />}
          nextArrow={<div />}
          canSwipe
          infinite={false}
        >
          {dataPartner.map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <IconSvgLocal name={item?.ic as IconSvgTypes} height={150} width={150} />
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};
export const PartnerCompany = memo(Component, isEqual);
