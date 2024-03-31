import { Card } from 'antd';
import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';

import boss1 from '@/assets/image/boss-1.png';
import boss2 from '@/assets/image/boss-2.png';
import boss3 from '@/assets/image/boss-3.png';
import { IconSvgLocal, TextBase } from '@/components';
import useScreenResize from '@/hooks/useScreenResize';

const Component = (props) => {
  console.log(props, 'fff');
  const { t } = useTranslation();
  const data = useMemo(() => {
    return [
      {
        ava: boss1,
        name: t('text:boss1'),
        title: t('text:boss1_note'),
      },
      {
        ava: boss2,
        name: t('text:boss2'),
        title: t('text:boss2_note'),
      },
      {
        ava: boss3,
        name: t('text:boss3'),
        title: t('text:boss3_note'),
      },
    ];
  }, [t]);
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 3,
    slidesToShow: 3,
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
  const RenderList = useCallback(() => {
    return (
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
        {data.map((item, index) => (
          <Card
            hoverable
            type="inner"
            key={index}
            className={`${index === 2 ? 'mr-0' : ''} mb-12 mr-[64px] rounded-radius-xxxl mobile:mr-0`}
            cover={
              <div className="rounded-radius-xxxl bg-primary-50">
                <div className="img-custom overflow-hidden">
                  <Image fill className="img-inner" src={item?.ava} alt="Your Image" />
                </div>
              </div>
            }
          >
            <div className="rounded-radius-xxxl">
              <div className="flex items-center justify-between">
                <div className="mr-16 flex flex-1">
                  <TextBase preset="body-text-16-semibold">{item?.name}</TextBase>
                </div>
                <div className="flex size-40 items-center justify-center rounded-[100%] bg-primary-50">
                  <div className="flex size-32 items-center justify-center rounded-[100%] bg-primary-300">
                    <IconSvgLocal name="IC_LOGO_DARK" height={18} width={18} />
                  </div>
                </div>
              </div>
              <div className="mt-32">
                <TextBase preset="body-text-16-light">{item?.title}</TextBase>
              </div>
            </div>
          </Card>
        ))}
      </Slide>
    );
  }, [configShow.slidesToScroll, configShow.slidesToShow, data, indicators]);
  return (
    <div className="fly my-[64px] px-[64px] mobile:px-16">
      <TextBase preset="body-text-24-bold" presetMobile="body-text-18-bold">
        {t('text:member')}
      </TextBase>
      <div className="w-1/2 mobile:w-full">
        <TextBase
          className="mt-16 text-color-500"
          preset="body-text-18-light"
          presetMobile="body-text-16-light"
        >
          {t('text:member_intro')}
        </TextBase>
      </div>
      <div className="mt-48">{RenderList()}</div>
    </div>
  );
};
export const MemberList = memo(Component, isEqual);
