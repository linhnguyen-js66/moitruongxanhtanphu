import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { IconSvgLocal, TextBase } from '@/components';
import useScreenResize from '@/hooks/useScreenResize';
import { useWindowDimensions } from '@/hooks/useWindowDimension';

const Component = () => {
  const Dimensions = useWindowDimensions();
  const square = useMemo(() => (Dimensions.width - 13 * 8) / 3, [Dimensions.width]);
  const widthImg = useMemo(() => (Dimensions.width - 24 * 5) / 4, [Dimensions.width]);
  const typeDevice = useScreenResize();
  const paddingImg = useMemo(() => {
    switch (typeDevice) {
      case 'mobile':
        return 4;
      case 'tablet':
        return 8;
      default:
        return 12;
    }
  }, [typeDevice]);
  const sizeIcon = useMemo(() => {
    if (typeDevice == 'mobile') {
      return 24;
    }
    return 42;
  }, [typeDevice]);
  const headerSection = useMemo(() => {
    return (
      <div className="grid grid-flow-col grid-cols-3">
        <div className="flex items-center">
          <IconSvgLocal classNames="h-[80px] tablet:h-[64px] mobile:h-32" name="IC_ONLY_LOGO" />
          <IconSvgLocal name="IC_TEXT_TP" classNames="h-[80px]" width={square} />
        </div>
        <div
          style={{ width: square, padding: paddingImg }}
          className="semi-circle fade-animation relative m-12 aspect-square border-weight-s"
        >
          {/* <IconSvgLocal name="IC_CIRCLE_LINEAR" classNames="img-custom" /> */}
          <div className="img-custom aspect-square rounded-[100%]">
            <Image
              fill
              className="img-inner object-scale-down"
              src="https://images.unsplash.com/photo-1531875985735-f135dac5f230?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Your Image"
            />
          </div>
        </div>
        <div className="flex items-center">
          <IconSvgLocal name="IC_FEEDBACK" height={80} width={square} />
        </div>
      </div>
    );
  }, [paddingImg, square]);
  const dataComment = useMemo(() => {
    return [
      {
        name: 'Nguyen Van Minh - Giám Đốc Công ty A',
        title:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conUt enim ad minim',
        ava: 'https://media.istockphoto.com/id/1413766112/vi/anh/doanh-nh%C3%A2n-tr%C6%B0%E1%BB%9Fng-th%C3%A0nh-th%C3%A0nh-c%C3%B4ng-nh%C3%ACn-v%C3%A0o-m%C3%A1y-%E1%BA%A3nh-v%E1%BB%9Bi-s%E1%BB%B1-t%E1%BB%B1-tin.jpg?s=612x612&w=0&k=20&c=fkD6hoCvgM3sZXXhjgkJHzY-Lz3EUcNcbIOl_zoblcM=',
      },
      {
        name: 'Angel Phuong Trinh - Giám Đốc Công ty B',
        title:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conUt enim ad minim Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conUt enim ad minim',
        ava: 'https://img.freepik.com/free-photo/portrait-smiling-successful-businesswoman-looking-into-camera-sitting-restaurant-business-lady-with-stylish-hairstyle-wears-elegant-suit-business-meeting-attractive-appearance_8353-12611.jpg',
      },
    ];
  }, []);
  const RenderComment = useCallback(() => {
    return dataComment.map((item, index) => (
      <div
        key={index}
        className={`${index != 1 ? 'bg-color-100' : 'bg-primary-200'} p-24 ${dataComment?.length - 1 == index ? 'mb-0' : 'mb-16'} flex items-start rounded-radius-xxl`}
      >
        <div className="img-custom aspect-square size-[64px] shrink-0 overflow-hidden rounded-[100%]">
          <Image fill className="img-inner object-scale-down" src={item?.ava} alt="Your Image" />
        </div>
        <div className="ml-16 grow">
          <TextBase preset="body-text-18-medium" presetMobile="body-text-16-medium">
            {item?.name}
          </TextBase>
          <div className="mt-12">
            <TextBase
              preset="body-text-18-light"
              presetMobile="body-text-16-light"
              className="text-color-500 mobile:line-clamp-3"
            >
              “{item?.title}”
            </TextBase>
          </div>
        </div>
      </div>
    ));
  }, []);
  const RenderFooter = useCallback(() => {
    return [1, 2, 3, 4].map((el, index) => (
      <div key={el} className="ml-24">
        <IconSvgLocal name="IC_LOGO_HORIZONTAL" height={24} width={widthImg} />
      </div>
    ));
  }, [widthImg]);
  return (
    <div className="mt-48 px-32">
      {headerSection}
      <div className="mt-48 flex items-start justify-between mobile:mt-24 mobile:flex-col ">
        <div className="flex items-end mobile:mb-8">
          <TextBase
            t18n="Phản hồi"
            preset="body-text-32-light"
            presetTable="body-text-24-light"
            presetMobile="body-text-16-light"
          />
          <IconSvgLocal name="IC_ARROW_ITALIC_V2" width={sizeIcon} height={sizeIcon} />
        </div>
        <div className="w-1/4 tablet:w-[35%] mobile:w-full">
          <TextBase
            preset="body-text-24-regular"
            presetMobile="body-text-16-regular"
            t18n="Danh mục phản hồi khách hàng, nền tảng cải thiện sản phẩm và dịch vụ"
            className="text-color-500"
          />
        </div>
      </div>
      <div className="mt-48 mobile:mt-24">{RenderComment()}</div>
      <div className="-mx-32 mt-[120px] flex overflow-x-hidden bg-primary-200 py-8 mobile:mt-32">
        {RenderFooter()}
      </div>
    </div>
  );
};
export const CommentCustomer = memo(Component, isEqual);
