import type { LayoutProps, MenuProps } from 'antd';
import { Layout, Tooltip } from 'antd';
import { changeLanguage } from 'i18next';
import { get } from 'lodash';
import Lottie from 'lottie-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import SUPPORT_STAFF from '@/assets/image/support-staff.webp';
import LoadingAnimation from '@/assets/json/loading.json';
import { ButtonBase, IconSvgLocal, TextBase } from '@/components';
import { K_HOTLINE_SECOND } from '@/config/constants';
import { setLanguage } from '@/stores/globalSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/storage';

import { FooterApp } from '../footer';
import MenuCustom from '../menu';
import ZaloChatWidget from './customer-chatting';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);
  const [isVietnamese, setIsVietnamese] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const checkLanguageRecent = useCallback(() => {
    const data = loadFromLocalStorage('language');
    const language = get(data, 'vi', false);
    setIsVietnamese(language);
    dispatch(setLanguage(language ? 'vi' : 'en'));
    changeLanguage(language ? 'vi' : 'en');
  }, [dispatch]);
  useEffect(() => {
    checkLanguageRecent();
  }, [checkLanguageRecent]);
  const onChangeLanguage: MenuProps['onClick'] = useCallback(() => {
    saveToLocalStorage('language', {
      vi: !isVietnamese,
    });

    if (!isVietnamese) {
      setIsVietnamese(true);
      dispatch(setLanguage('vi'));
      changeLanguage('vi');
      return;
    }
    setIsVietnamese(false);
    dispatch(setLanguage('en'));
    changeLanguage('en');
  }, [dispatch, isVietnamese]);

  const selectLanguage = useCallback(() => {
    return (
      <ButtonBase
        type="whiteGhost"
        name="language"
        onClick={onChangeLanguage}
        classNames="bg-color-transparent hover:bg-color-transparent"
        // rightIcon={isVietnamese ? 'IC_VIETNAM' : 'IC_ENGLISH'}
        // widthIcon={64}
        customContent={
          <div>
            <IconSvgLocal
              classNames="hover:shadow-down-m hover:rounded-[100%]"
              height={48}
              name={isVietnamese ? 'IC_VIETNAM' : 'IC_ENGLISH'}
            />
          </div>
        }
      />
    );
  }, [isVietnamese, onChangeLanguage]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);
  const renderLoading = useCallback(() => {
    return (
      <div className="absolute z-[88] flex size-full flex-col items-center justify-center">
        <Lottie animationData={LoadingAnimation} loop style={{ height: 300, width: 300 }} />
        <TextBase t18n="text:loading" preset="body-text-32-semibold" className="text-color-900" />
      </div>
    );
  }, []);

  return (
    <div className="flex min-h-[100vh] flex-col justify-between bg-common-1000">
      {isLoading ? (
        renderLoading()
      ) : (
        <div>
          <div className="bg_home_page flex flex-col">
            <MenuCustom ref={refMenu} />
            <div className="wrap_layout">
              <Content>
                <>{children}</>
              </Content>
            </div>
          </div>

          {/* */}

          <FooterApp />
          <div className="fixed bottom-[120px] right-[42px] z-50 flex flex-col items-center">
            {selectLanguage()}
            <a
              href={`tel://${K_HOTLINE_SECOND}`}
              className="mt-16 aspect-square rounded-[100%] bg-primary-700 hover:shadow-down-m hover:shadow-primary-500"
            >
              <Tooltip
                placement="leftBottom"
                title={t('text:hi')}
                trigger="focus"
                defaultOpen
                overlayInnerStyle={{ background: 'rgb(var(--primary-700))' }}
              >
                <Image
                  src={SUPPORT_STAFF}
                  width={52}
                  height={52}
                  alt="Công ty môi trường xanh Tân Phú hỗ trợ dịch vụ tiêu huỷ hàng hoá"
                />
              </Tooltip>
            </a>
          </div>
          <ZaloChatWidget />
        </div>
      )}
    </div>
  );
}
