import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

import { IconSvgLocal, TextBase } from '@/components';
import { useHome } from '@/hooks/useHome';

const Component = () => {
  const { dataIntro, selectItem, handleScroll } = useHome();
  const renderList = useCallback(() => {
    return dataIntro.map((item, index) => (
      <div
        key={index}
        className={`${selectItem?.id == item?.id ? 'bg-primary-700' : 'bg-color-50'} rounded-radius-none ${index == dataIntro?.length - 1 ? 'mr-0' : 'mr-24'}`}
      >
        <div className="relative h-[236px] w-[400px] p-24 tablet:w-[380px] mobile:flex mobile:h-[134px] mobile:w-[330px]">
          <div className="mb-24 flex size-[80px] items-center justify-center rounded-[100px] bg-color-100 mobile:mb-0 mobile:size-[60px]">
            <IconSvgLocal
              name={item?.ic}
              classNames="h-[60px] w-[60px] mobile:h-[40px] tablet:h-[50px]"
            />
          </div>
          <div className="flex grow flex-col mobile:ml-24">
            <TextBase
              className={`body-text-24-bold mb-8  ${selectItem?.id == item?.id ? 'text-color-50' : 'text-text-primary'}`}
              presetMobile="body-text-18-bold"
              presetTable="body-text-18-bold"
            >
              {item?.title?.toUpperCase()}
            </TextBase>
            <TextBase
              className={`body-text-14-regular ${selectItem?.id == item?.id ? 'text-color-50' : 'text-text-primary'}`}
            >
              {item?.des}
            </TextBase>
          </div>
          {/** ICON */}
          {selectItem?.id == item?.id ? (
            <div className="absolute right-0 top-0">
              <IconSvgLocal
                name="IC_ENERGY"
                classNames="h-[200px] mobile:h-[140px] tablet:h-[180px]"
              />
            </div>
          ) : null}
        </div>
      </div>
    ));
  }, [dataIntro, selectItem?.id]);
  return (
    <div
      className="flex scroll-m-0 overflow-x-scroll tablet:ml-16 mobile:ml-16"
      onWheel={handleScroll}
    >
      {renderList()}
    </div>
  );
};
export const ListIntro = memo(Component, isEqual);
