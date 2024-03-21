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
import { CustomerSupport } from './customer-chatting';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);
  const [isVietnamese, setIsVietnamese] = useState(true);
  const dispatch = useDispatch();
  const checkLanguageRecent = useCallback(() => {
    const data = loadFromLocalStorage('language');
    const language = get(data, 'vi', false);
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
        type="default"
        className={`gradient-button ${isVietnamese ? 'active' : ''} mr-16 flex aspect-square size-[60px] items-center justify-center rounded-[100%] shadow-down-m shadow-color-500`}
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
      <div className="bound-animation fixed bottom-32 right-32 z-50 flex items-center p-16 transition duration-150 ease-in-out">
        {selectLanguage()}
        <CustomerSupport />
      </div>
      <FooterApp />
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
