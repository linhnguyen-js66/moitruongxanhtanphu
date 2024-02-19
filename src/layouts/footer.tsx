import { Divider, Layout } from 'antd';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { IconSvgTypes } from '@/assets/svg';
import { IconSvgLocal, TextBase } from '@/components';
import {
  K_BOSS_FIRST,
  K_BOSS_SECOND,
  K_EMAIL,
  K_HOTLINE_FIRST,
  K_HOTLINE_SECOND,
} from '@/config/constants';

const { Footer } = Layout;

const FooterApp = () => {
  const { t } = useTranslation();
  const dataSocial = useMemo(
    () => [
      {
        ic: 'IC_ZALO',
        link: '',
      },
      {
        ic: 'IC_FACEBOOK',
        link: '',
      },
      {
        ic: 'IC_INS',
        link: '',
      },
      {
        ic: 'IC_LINKEDLN',
        link: '',
      },
      {
        ic: 'IC_YOUTUBE',
        link: '',
      },
    ],
    []
  );
  const dataAdress = useMemo(() => {
    return [
      {
        address: t('text:address_first'),
      },
      {
        address: t('text:address_second'),
      },
      {
        address: t('text:address_third'),
      },
    ];
  }, [t]);
  const renderEmail = useCallback(() => {
    return (
      <div className="mb-32 mr-32 flex flex-col">
        <TextBase t18n="text:email" className="body-text-18-regular mb-24 text-primary-800" />
        <TextBase className="body-text-16-light mb-24 text-text-primary">{K_EMAIL}</TextBase>
        <div className="flex items-center">
          {dataSocial.map((item, index) => {
            return (
              <a
                href={item?.link}
                key={index}
                className={`${index == dataSocial.length - 1 ? 'mr-0' : 'mr-24'}`}
              >
                <IconSvgLocal name={item?.ic as IconSvgTypes} classNames="h-24" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }, []);

  const renderAddress = useCallback(() => {
    return (
      <div className="mr-32 flex flex-col">
        <TextBase t18n="text:address" className="body-text-18-regular mb-24 text-primary-800" />
        {dataAdress.map((item, index) => (
          <TextBase key={index} className="body-text-16-light mb-24 w-[200px] text-text-primary">
            {item?.address}
          </TextBase>
        ))}
      </div>
    );
  }, [dataAdress]);
  const renderContact = useCallback(() => {
    return (
      <div className="flex flex-col">
        <TextBase t18n="text:contact" className="body-text-18-regular mb-24 text-primary-800" />
        <TextBase className="body-text-16-light mb-24 text-text-primary">
          {K_BOSS_FIRST}: {K_HOTLINE_FIRST}
        </TextBase>
        <TextBase className="body-text-16-light mb-24 text-text-primary">
          {K_BOSS_SECOND}: {K_HOTLINE_SECOND}
        </TextBase>
      </div>
    );
  }, [dataSocial]);
  return (
    <Footer
      className="footer_app bg-common-1000 tablet:bg-primary-200 mobile:bg-primary-200"
      style={{ height: 'auto' }}
    >
      <div className="flex flex-1">
        <div className="relative w-[100%] pb-48 pt-[100px] mobile:px-24 mobile:pb-24 mobile:pt-[48px]">
          <div className="absolute bottom-0 right-0">
            <IconSvgLocal name="IC_FOOTER" classNames="h-[350px] tablet:hidden mobile:hidden" />
          </div>
          <div className="flex items-start justify-between px-32 mobile:flex-col">
            <div className="z-50 mr-48 w-1/4 mobile:mb-32">
              <IconSvgLocal
                name="IC_LOGO_V2"
                classNames="mobile:h-[32px] tablet:h-[36px] h-[42px]"
              />
            </div>
            <div className="z-50 flex w-3/4 justify-between mobile:flex-col">
              {renderAddress()}
              {renderEmail()}
              {renderContact()}
            </div>
          </div>
          <div className="mt-48 flex w-[100%] items-center justify-center mobile:flex-col mobile:justify-center">
            <div className="z-50 flex items-center mobile:mb-12">
              <TextBase className="body-text-14-regular text-text-primary">Services</TextBase>
              <Divider type="vertical" className="mx-20 bg-common-0" />
              <TextBase className="body-text-14-regular text-text-primary">Privacy Policy</TextBase>
            </div>
            <TextBase className="body-text-12-regular z-50 ml-12 text-text-primary">
              © 2024 MOITRUONGXANHTANPHU All Rights Reserved
            </TextBase>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export { FooterApp };
