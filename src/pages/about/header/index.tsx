import Image from 'next/image';
import { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import BANNER from '@/assets/image/banner-about.avif';
import { TextBase } from '@/components';

const Component = () => {
  const { t } = useTranslation();
  const adwards = useMemo(() => {
    return [
      {
        num: 50,
        title: t('text:sangkien'),
      },
      {
        title: t('text:giaiphap'),
        num: 35,
      },
      {
        title: t('text:giaithuong'),
        num: 40,
      },
      {
        title: t('text:project'),
        num: 60,
      },
    ];
  }, [t]);

  return (
    <div className="bg-common-500 p-[64px] mobile:p-16">
      <div className="grid grid-flow-row grid-cols-2 gap-16 mobile:grid-cols-1">
        {/** 1 */}
        <div className="item-animation max-h-[500px] rounded-radius-xxxl bg-common-1000 px-24 py-48 shadow-down-m shadow-color-100 mobile:max-h-full">
          <TextBase
            t18n="text:about_comp"
            preset="body-text-24-semibold"
            presetMobile="body-text-18-semibold"
            presetTable="body-text-18-semibold"
            className="text-primary-700"
          />
          <TextBase
            preset="body-text-48-bold"
            presetTable="body-text-24-semibold"
            presetMobile="body-text-24-semibold"
            className="mt-32 text-common-0 tablet:mt-16"
          >
            {t('text:company_name')}
          </TextBase>
          <TextBase
            preset="body-text-16-light"
            presetTable="body-text-14-light"
            className="mt-16 text-common-0 tablet:line-clamp-[15] mobile:mt-24"
          >
            {t('text:comp_intro')}
          </TextBase>
        </div>
        <div className="item-animation flex max-h-[500px] flex-col gap-16 mobile:grid mobile:max-h-full mobile:grid-flow-col mobile:grid-cols-2">
          {/** 2 */}
          <div className="img-custom grow overflow-auto overflow-hidden rounded-radius-xxxl">
            <Image
              fill
              className="img-inner"
              src={BANNER}
              alt="Công ty Môi trường xanh Tân Phú - TAN PHU GREEN ENVIRONMENT COMPANY LIMITED tiêu huỷ hàng hoá theo yêu cầu"
              loading="lazy"
              placeholder="blur"
              sizes="100vw"
            />
          </div>
          {/** 3 */}
          <div className="grid grid-flow-row grid-cols-2 gap-12 rounded-radius-xxxl bg-common-1000 px-24 py-48 shadow-down-m shadow-color-100 mobile:grid-cols-1">
            {adwards.map((item, index) => (
              <div key={index} className="rounded-radius-l bg-color-100 p-16">
                <TextBase preset="body-text-24-semibold" presetMobile="body-text-18-semibold">
                  {item?.num}+
                </TextBase>
                <TextBase preset="body-text-16-light" presetMobile="body-text-14-light">
                  {item?.title}
                </TextBase>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const HeaderAboutPage = memo(Component, isEqual);
