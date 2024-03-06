import 'react-slideshow-image/dist/styles.css';

import { Button } from 'antd';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';

import { IconSvgLocal, TextBase } from '@/components';
import useScreenResize from '@/hooks/useScreenResize';

const Component = () => {
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 3,
    slidesToShow: 3,
  });
  const typeDevice = useScreenResize();
  console.log(typeDevice);
  useEffect(() => {
    if (typeDevice == 'mobile') {
      setConfigShow({
        slidesToScroll: 1,
        slidesToShow: 1,
      });
    }
  }, [typeDevice]);
  const indicators = (index: any) => <div className="indicator_side" key={index} />;
  const renderHeader = useCallback(() => {
    return (
      <div className="flex flex-row justify-between mobile:flex-col">
        <div className="w-1/4 mobile:mb-16 mobile:w-full">
          <TextBase
            t18n="text:project_content"
            preset="body-text-18-medium"
            className="text-color-500 mobile:text-center"
            presetMobile="body-text-16-medium"
          />
        </div>
        {/* <div className="flex flex-col items-end bg-primary-100 mobile:items-start"> */}
        <div className="flex flex-col items-end justify-end mobile:items-center">
          <div className="w-[65%] mobile:w-full">
            <TextBase
              t18n="text:project_content_next"
              preset="body-text-48-light"
              presetMobile="body-text-24-light"
              className="text-right mobile:text-center"
            />
          </div>

          <div className="mt-32 flex flex-1">
            <Button
              className="background-btn-about h-46 rounded-radius-xxxl bg-primary-100 px-36"
              name="about"
              onClick={() => {}}
            >
              <TextBase
                t18n="text:about_comp"
                preset="body-text-16-regular"
                className="text-common-0"
              />
            </Button>
            <Button
              className="background-btn-project ml-12 flex h-46 items-center justify-center border-weight-none"
              name="project"
              onClick={() => {}}
              type="text"
            >
              <TextBase
                t18n="text:project_highlight"
                preset="body-text-16-regular"
                className="mr-4"
              />
              <IconSvgLocal name="IC_ARROW_RIGHT" height={16} />
            </Button>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }, []);
  const { t } = useTranslation();
  const renderBody = useCallback(() => {
    return (
      <div className="my-48 mobile:flex mobile:w-full mobile:justify-between">
        <Button
          className="background-btn-about h-36 rounded-radius-xxxl border-weight-l border-common-0 px-36"
          name="btnProject"
          onClick={() => {}}
        >
          <TextBase t18n="text:project" preset="body-text-16-regular" className="text-common-0" />
        </Button>
        <div className="mt-24 w-[55%] mobile:ml-16 mobile:mt-0 mobile:w-full">
          <TextBase
            preset="body-text-48-light"
            presetMobile="body-text-24-light"
            className="mobile:text-right"
          >
            {t('text:project_content_last')}
            <span className="rounded-radius-4xl bg-primary-100 px-16">{t('text:vietnam')}</span>
          </TextBase>
        </div>
      </div>
    );
  }, [t]);
  const buttonViewMore = useCallback(
    (link: string) => (
      <Button
        className="background-btn-project flex items-center border-weight-none p-0"
        name="project"
        onClick={() => {}}
        type="text"
      >
        <TextBase t18n="Xem thêm" preset="body-text-16-regular" className="mr-8" />
        <div className="flex size-32 items-center justify-center rounded-[100%] bg-common-1000">
          <IconSvgLocal name="IC_ARROW_DOWN" classNames="-rotate-90" height={16} />
        </div>
      </Button>
    ),
    []
  );
  const renderFooter = useCallback(() => {
    return (
      <Slide
        slidesToScroll={configShow.slidesToScroll}
        slidesToShow={configShow.slidesToShow}
        indicators={indicators}
        autoplay={false}
        prevArrow={<div />}
        nextArrow={<div />}
        canSwipe
      >
        <div className=" pr-12 mobile:pr-0">
          <div className="flex w-full flex-col rounded-radius-xxxl bg-color-100 p-24">
            <div className="flex justify-center">
              <div className="mr-16 flex flex-col justify-between">
                <div>
                  <div className="w-[60%] mobile:w-full">
                    <TextBase t18n="Xử lý, tái chế chất thải" preset="body-text-24-light" />
                  </div>
                  <div className="mt-12">
                    <TextBase
                      preset="body-text-16-light"
                      t18n="Đơn vị tiên phong xử lý pin năng lượng mặt trời, có khả năng thu hồi và tái chế kim loại màu tại Việt Nam"
                    />
                  </div>
                </div>
                <div className="mt-16">{buttonViewMore('')}</div>
              </div>
              <div className="img-custom rounded-radius-xxl">
                <Image
                  fill
                  className="img-inner object-scale-down"
                  src="https://images.unsplash.com/photo-1708356476484-ac4797f0dac8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Your Image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="size-full pr-12 mobile:pr-0">
          <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-radius-xxxl bg-primary-100 p-24 mobile:w-full">
            <div>
              <div className="absolute px-16 py-4">
                <TextBase t18n="Tư vấn" preset="body-text-24-light" />
                <TextBase t18n="môi trường" preset="body-text-24-light" />
              </div>
              <IconSvgLocal name="IC_FRAME_WHITE" height={80} />
            </div>
            <div className="z-50">{buttonViewMore('')}</div>
            <div className="absolute -bottom-32 -left-32 rounded-radius-5xl">
              <IconSvgLocal name="IC_CIRCLE" height={200} classNames="" />
            </div>
          </div>
        </div>
        <div className="size-full pr-12 mobile:pr-0">
          <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-radius-xxxl bg-primary-100 p-24 mobile:w-full">
            <div className="w-3/5 rounded-radius-xxl bg-common-1000 p-16">
              <TextBase t18n="Kinh doanh nhập khẩu phế liệu" preset="body-text-24-light" />
            </div>
            <div className="z-50">{buttonViewMore('')}</div>
            <div className="absolute -bottom-32 -left-32 rounded-radius-5xl">
              <IconSvgLocal name="IC_CIRCLE" height={200} classNames="" />
            </div>
          </div>
        </div>
      </Slide>
    );
  }, [buttonViewMore, configShow.slidesToScroll, configShow.slidesToShow]);
  return (
    <div className="mt-[64px] px-32">
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </div>
  );
};
export const ProjectHighLight = memo(Component, isEqual);
