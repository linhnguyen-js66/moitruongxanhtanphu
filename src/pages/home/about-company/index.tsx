import { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { TextBase } from '@/components';

const Component = (props: any) => {
  const { isCount } = props;

  const { t } = useTranslation();
  const data = useMemo(
    () => [
      {
        amount: 3,
        title: t('text:nhamay'),
        size: 15,
      },
      {
        amount: 100,
        title: t('text:quymo'),
        size: 30,
      },
      {
        amount: 16,
        title: t('text:congnghe'),
        size: 25,
      },
    ],
    [t]
  );
  return (
    <div className="relative mx-32 my-[120px] mobile:mt-32">
      <div className="absolute flex size-full items-center justify-center mobile:relative mobile:flex-col">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex size-[30%] flex-col items-center mobile:size-full ${index == 1 ? 'mx-16 mobile:my-16' : ''}`}
          >
            <TextBase
              preset="body-text-64-semibold"
              presetMobile="body-text-48-semibold"
              className={`mb-16 ${index == 1 ? 'text-primary-800' : 'text-primary-100'}`}
            >
              {item?.amount} <span>+</span>
            </TextBase>

            <TextBase
              className="text-center"
              preset="body-text-24-light"
              presetMobile="body-text-16-light"
            >
              {item?.title}
            </TextBase>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center mobile:hidden">
        <div className="-mr-48 ml-48 aspect-square size-[15%] rounded-[100%] border-weight-m border-color-300 tablet:-mr-32 mobile:-mr-24" />
        <div className="-mr-48 aspect-square size-[30%] rounded-[100%] border-weight-m border-color-300 tablet:-mr-32 mobile:-mr-24" />
        <div className="aspect-square size-[25%] rounded-[100%] border-weight-m border-color-300" />
      </div>
    </div>
  );
};
export const AboutCompany = memo(Component, isEqual);
