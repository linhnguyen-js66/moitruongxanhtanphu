import Image from 'next/image';
import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

import { IconSvgLocal, TextBase } from '@/components';
import { useNews } from '@/hooks/useNews';
import { convertImage, toBase64 } from '@/utils/other';

const Component = () => {
  const { highLight, loading, listNews } = useNews();
  const renderNewsStraight = useCallback(() => {
    return listNews.map((item, index) => (
      <div key={index} className="mb-16 flex items-center mobile:flex-col mobile:items-start">
        <div className="img-custom h-[150px] w-[200px] rounded-radius-l mobile:w-full">
          {item?.image && (
            <Image
              fill
              src={item?.image}
              alt={item?.title}
              loading="lazy"
              sizes="100vw"
              className="img-inner"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`}
            />
          )}
        </div>
        <div className="ml-32 flex flex-1 flex-col mobile:mb-16 mobile:ml-0">
          <TextBase
            className="line-clamp-2"
            preset="body-text-16-semibold"
            presetMobile="body-text-14-semibold"
          >
            {item?.title}
          </TextBase>
          <TextBase
            className="mt-16 line-clamp-3"
            preset="body-text-16-light"
            presetMobile="body-text-14-light"
          >
            {item?.content}
          </TextBase>
        </div>
      </div>
    ));
  }, [listNews]);
  const renderHighLight = useCallback(() => {
    return (
      <div className="grid grid-flow-row grid-cols-3 gap-32 tablet:grid-cols-1 mobile:grid-cols-1">
        <div className="img-custom rounded-radius-4xl">
          {highLight?.image && (
            <Image
              fill
              src={highLight?.image}
              alt={highLight?.title}
              loading="lazy"
              sizes="100vw"
              className="img-inner"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <TextBase
            preset="body-text-16-regular"
            presetMobile="body-text-14-light"
            className="text-color-500"
          >
            {highLight?.timeUp}
          </TextBase>
          <TextBase
            className="mt-16 line-clamp-6"
            preset="body-text-64-semibold"
            presetMobile="body-text-18-semibold"
            presetTable="body-text-32-semibold"
          >
            {highLight?.title}
          </TextBase>
          <TextBase
            className="mt-16 line-clamp-[15] text-justify"
            preset="body-text-18-light"
            presetMobile="body-text-16-light"
          >
            {highLight?.content}
          </TextBase>
        </div>
        <div>{renderNewsStraight()}</div>
      </div>
    );
  }, [
    highLight?.content,
    highLight?.image,
    highLight?.timeUp,
    highLight?.title,
    renderNewsStraight,
  ]);

  return (
    <div className="p-32">
      {loading && !listNews?.length ? (
        <div className="spin-animation flex h-[300px] w-full items-center justify-center">
          <IconSvgLocal height={32} name="IC_LOADING" />
        </div>
      ) : (
        <div className="fade-animation">{renderHighLight()}</div>
      )}
    </div>
  );
};
export const ListNews = memo(Component, isEqual);
