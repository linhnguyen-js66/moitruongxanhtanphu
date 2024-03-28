import Image from 'next/image';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import BannerFirst from '@/assets/image/banner-1.avif';
import BannerSecond from '@/assets/image/banner-2.jpg';
import BannerThird from '@/assets/image/banner-3.avif';
import BannerFour from '@/assets/image/banner-4.avif';
import { IconSvgLocal, TextBase } from '@/components';

const Component = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-flow-row grid-cols-3 gap-12  px-32 tablet:gap-4 mobile:grid-cols-1 mobile:gap-[2px]">
      {/** Left */}
      <div className="grid grid-flow-row grid-cols-3 items-center justify-items-center gap-12 bg-link-50 tablet:gap-4 mobile:gap-[2px]">
        <div className="radius-img img-custom item-animation aspect-square mobile:aspect-auto mobile:h-full">
          <Image
            className="img-inner object-fill"
            src={BannerFirst}
            alt="công nghệ tái chế phế liệu hiện đại của Công Ty Môi Trường Xanh Tân Phú"
            fill
            loading="lazy"
            placeholder="blur"
            sizes="100vw"
          />
        </div>
        <div className="item-animation relative col-span-2 aspect-square w-full">
          <div className="radius-img flex flex-col items-center justify-center bg-color-100 p-32 tablet:p-12 mobile:h-1/2 mobile:p-8">
            <TextBase
              className="text-center mobile:line-clamp-1"
              preset="body-text-16-semibold"
              presetMobile="body-text-14-medium"
              // presetTable="body-text-14-semibold"
            >
              + 685 {t('text:idea_environment')}
            </TextBase>
            <TextBase
              preset="body-text-16-light"
              presetMobile="body-text-12-light"
              // presetTable="body-text-14-light"
              className="mt-12 line-clamp-3 text-center mobile:mt-4 mobile:line-clamp-2"
            >
              {t('text:idea_note')}
            </TextBase>
          </div>
          <div className="radius-img -mt-24 flex flex-col items-center  justify-center bg-primary-100 p-32 tablet:mt-0 tablet:p-12 mobile:mt-[2px] mobile:h-1/2 mobile:p-8">
            <TextBase
              className="text-center mobile:line-clamp-1"
              preset="body-text-16-semibold"
              presetMobile="body-text-14-medium"

              // presetMobile="body-text-12-medium"
              // presetTable="body-text-14-semibold"
            >
              + 285 {t('text:partner_note')}
            </TextBase>
            <TextBase
              preset="body-text-16-light"
              presetMobile="body-text-12-light"
              // presetMobile="body-text-12-light"
              // presetTable="body-text-14-light"
              className="mt-12 line-clamp-3 text-center tablet:mt-4 mobile:mt-4 mobile:line-clamp-2"
            >
              {t('text:partner_des')}
            </TextBase>
          </div>
        </div>
      </div>
      {/** Center */}
      <div className="image-container radius-img item-animation">
        <Image
          fill
          className="img-home"
          src={BannerSecond}
          alt="cung cấp dịch vụ tiêu huỷ hàng hoá tại Công Ty Môi Trường Xanh Tân Phú"
          loading="lazy"
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute right-[50%] top-0 translate-x-1/2 p-24">
          <div className="rounded-[100%] bg-color-50 p-12">
            <IconSvgLocal name="IC_SETTING" height={28} classNames="spin-animation" />
          </div>
        </div>
      </div>
      {/** Right */}
      <div className="grid grid-flow-row grid-cols-3 items-center justify-items-center gap-12 tablet:gap-4 mobile:gap-[2px]">
        <div className="img-custom radius-img item-animation col-span-2 aspect-square">
          <Image
            fill
            className="img-inner"
            src={BannerThird}
            alt="xử lý rác thải nhập khẩu phế liệu của Công ty môi trường xanh Tân Phú"
            loading="lazy"
            placeholder="blur"
            sizes="100vw"
          />
          {/** TAM NHIN */}
          <div className="absolute top-0 flex size-full flex-col justify-between p-16">
            <div className="flex">
              <div className="mr-4 rounded-radius-5xl border-weight-l border-common-1000 px-16 py-4 tablet:p-4 mobile:p-4">
                <TextBase
                  t18n="text:vision"
                  preset="body-text-16-light"
                  presetMobile="body-text-12-light"
                  presetTable="body-text-12-light"
                  className="text-common-1000"
                />
              </div>
              <div className="mr-4 rounded-radius-5xl border-weight-l border-common-1000 px-16 py-4 tablet:p-4 mobile:p-4">
                <TextBase
                  t18n="text:mission"
                  preset="body-text-16-light"
                  // presetMobile="body-text-12-light"
                  // presetTable="body-text-12-light"
                  className="text-common-1000"
                />
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="absolute flex h-full items-center justify-center p-16">
                <TextBase
                  preset="body-text-16-light"
                  presetMobile="body-text-14-light"
                  // presetTable="body-text-12-light"
                >
                  {t('text:vision_view').substring(0, 60)}
                </TextBase>
              </div>

              <IconSvgLocal name="IC_FRAME_HOME" />
            </div>
          </div>
        </div>
        <div className="radius-img img-custom item-animation aspect-square mobile:aspect-auto mobile:h-full">
          <Image
            fill
            className="img-inner"
            src={BannerFour}
            alt="đội ngũ Tan Phu Environment sử dụng công nghệ tái chế tiên tiến"
            loading="lazy"
            placeholder="blur"
            sizes="100vw"
          />
          <div className="absolute top-0 z-50 size-full bg-color-700 p-16 opacity-l">
            <div className="flex flex-1 justify-end">
              <div className="flex size-24 items-center justify-center rounded-[50%] bg-common-1000">
                <IconSvgLocal height={24} name="IC_ARROW_ITALIC_RIGHT" />
              </div>
            </div>
            <div className="flex flex-1">
              <TextBase
                preset="body-text-16-light"
                presetMobile="body-text-14-light"
                // presetMobile="body-text-12-light"
                // presetTable="body-text-12-light"
                className="mt-8 line-clamp-4 text-center text-common-1000 tablet:mt-4 mobile:mt-4"
              >
                {t('text:member_comp')}
              </TextBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FooterHome = memo(Component, isEqual);
