import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';

import { IconSvgLocal, TextBase } from '@/components';
import useScreenResize from '@/hooks/useScreenResize';
import { useWindowDimensions } from '@/hooks/useWindowDimension';
import { selectLanguage } from '@/stores/globalSlice';

const Component = () => {
  const Dimensions = useWindowDimensions();
  const square = useMemo(() => (Dimensions.width - 13 * 8) / 3, [Dimensions.width]);
  const [feedback, setFeedBack] = useState([]);
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
  const language = useSelector(selectLanguage);

  const getFeedback = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'feedback'));
    const list = querySnapshot.docs.map((doc) => ({
      documentID: doc.id,
      ...doc.data(),
      feedback: language == 'vi' ? doc?.data().content?.vi : doc?.data().content?.en,
    }));
    setFeedBack(list);
  }, [language]);
  useEffect(() => {
    getFeedback();
  }, [getFeedback]);
  const RenderComment = useCallback(() => {
    return feedback?.map((item, index) => (
      <div
        key={index}
        className={`${index != 1 ? 'bg-color-100' : 'bg-primary-200'} p-24 ${feedback?.length - 1 == index ? 'mb-0' : 'mb-16'} flex items-start rounded-radius-xxl`}
      >
        <div className="img-custom flex aspect-square size-[64px] shrink-0 items-center justify-center overflow-hidden rounded-[100%] bg-color-50">
          <Image
            className="object-contain"
            src={item?.ava}
            alt="Your Image"
            width={64}
            height={64}
            loading="lazy"
            // placeholder="blur"
            sizes="100vw"
          />
        </div>
        <div className="ml-16 grow">
          <TextBase preset="body-text-18-medium" presetMobile="body-text-16-medium">
            {item?.name} - {item?.position}{' '}
            <span className="body-text-16-light italic">({item?.company})</span>
          </TextBase>
          <div className="mt-12">
            <TextBase
              preset="body-text-18-light"
              presetMobile="body-text-16-light"
              className="text-color-500 mobile:line-clamp-3"
            >
              “{item?.feedback}”
            </TextBase>
          </div>
        </div>
      </div>
    ));
  }, [feedback]);
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
            t18n="text:feedback"
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
            t18n="text:feedback_note"
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
