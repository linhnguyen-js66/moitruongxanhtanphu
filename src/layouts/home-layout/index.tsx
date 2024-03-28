import type { LayoutProps, MenuProps } from 'antd';
import { Button, Layout } from 'antd';
import { changeLanguage } from 'i18next';
import { get } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IconSvgLocal } from '@/components';
import { setLanguage } from '@/stores/globalSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/storage';

import { FooterApp } from '../footer';
import MenuCustom from '../menu';
import ZaloChatWidget from './customer-chatting';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);
  const [isVietnamese, setIsVietnamese] = useState(true);
  const dispatch = useDispatch();
  const checkLanguageRecent = useCallback(() => {
    const data = loadFromLocalStorage('language');
    const language = get(data, 'vi', 'en');
    setIsVietnamese(language);
    dispatch(setLanguage(language));
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
      <Button
        type="text"
        className="flex items-center justify-center shadow-down-m shadow-color-500"
        onClick={onChangeLanguage}
      >
        <IconSvgLocal name={isVietnamese ? 'IC_VIETNAM' : 'IC_ENGLISH'} />
      </Button>
    );
  }, [isVietnamese, onChangeLanguage]);
  return (
    <div className="flex min-h-[100vh] flex-col justify-between bg-common-1000">
      <div className="bg_home_page flex flex-col">
        <MenuCustom ref={refMenu} />
        <div className="wrap_layout">
          <Content>
            <>{children}</>
          </Content>
        </div>
      </div>
      <div className="fixed bottom-[120px] right-[52px] z-50 flex flex-col items-center p-16">
        {selectLanguage()}
      </div>

      {/* */}

      <FooterApp />
      <ZaloChatWidget />
    </div>
  );
}
