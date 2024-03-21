import type { MenuProps } from 'antd';
import { Button, Divider, Drawer, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import type { IconSvgTypes } from '@/assets/svg';
import { ButtonBase, IconSvgLocal, TextBase } from '@/components';
import { Toggle } from '@/components/toggle';
import { ROUTES } from '@/config/routes';
import { selectLanguage, setLanguage } from '@/stores/globalSlice';
import { changeLanguage } from '@/utils/i18n/i18n';

interface MenuNav {
  icon?: IconSvgTypes;
  label?: ReactNode;
  link?: string;
}
// eslint-disable-next-line react/display-name
const Component = forwardRef((props, ref) => {
  const [showMenu, setShowMenu] = useState<'active_menu' | 'inactive_menu'>('inactive_menu');
  const [keyActive, setKeyActive] = useState('');
  const language = useSelector(selectLanguage);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const onShowHideMenu = useCallback(() => {
    const status = showMenu == 'active_menu' ? 'inactive_menu' : 'active_menu';
    setShowMenu(status);
  }, [showMenu]);
  useImperativeHandle(ref, () => ({
    onShowHideMenu,
  }));
  const [isVietnamese, setIsVietnamese] = useState(true);
  const { t } = useTranslation();
  const activeClassName = 'body-text-16-bold text-primary-700 mobile:body-text-14-bold';
  const inactiveClassName = 'body-text-16-regular text-text-primary mobile:body-text-14-regular';
  const menuData: MenuNav[] = useMemo(
    () => [
      {
        label: 'text:home',
        link: ROUTES.HOME,
        ic: 'IC_HOME',
      },
      {
        label: 'text:about',
        link: ROUTES.ABOUT,
        ic: 'IC_PROJECT',
      },
      {
        label: 'text:news',
        link: ROUTES.NEWS,
        ic: 'IC_NEWS',
      },
    ],
    []
  );
  const optionLanguage = [
    { label: t('text:vietnamese'), key: 1 },
    { label: t('text:english'), key: 2 },
  ];
  const onClick: MenuProps['onClick'] = useCallback(() => {
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
  useEffect(() => {
    // Get the current route from the router
    const currentRoute = router.pathname;
    // Find the corresponding menu item and set its key as the active key
    const activeMenuItem = menuData.find((item: any) => currentRoute === item.link);
    if (activeMenuItem) {
      setKeyActive(activeMenuItem.link);
    }
  }, [router.pathname, menuData]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const menuInMobile = useCallback(() => {
    return (
      <div onClick={toggleCollapsed}>
        <IconSvgLocal name="IC_MENU" height={32} />
        <Drawer open={collapsed} closable={false}>
          <Space className="mb-[42px] flex items-center justify-between">
            <IconSvgLocal name="IC_LOGO_V2" height={32} />
            <ButtonBase
              leftIcon="IC_CLOSE"
              heightIcon={48}
              widthIcon={48}
              styles={{ height: 32, borderRadius: 6, backgroundColor: 'transparent' }}
              type="primary"
              onClick={toggleCollapsed}
              name="close"
            />
          </Space>
          <Space className="flex flex-col items-start">
            {menuData?.map((e: any, i: number) => {
              return (
                <Link
                  href={e.link}
                  key={i}
                  className={`${keyActive == e?.link ? activeClassName : 'body-text-16-medium mobile:body-text-14-medium text-text-primary'}`}
                >
                  <div className={`${i == menuData?.length - 1 ? 'mb-4' : 'mb-24'}`}>
                    {t(e?.label)}
                  </div>
                </Link>
              );
            })}
          </Space>
          <Divider />
          <Space className="flex items-center justify-between">
            <div className="body-text-16-medium mobile:body-text-14-medium text-text-primary">
              {t('text:language')}
            </div>
            <div className="flex items-center" onClick={onClick}>
              <IconSvgLocal
                name={language == 'vi' ? 'IC_VIETNAM' : 'IC_ENGLISH'}
                classNames="h-24 mr-8"
              />
              {language == 'vi' ? (
                <TextBase className="body-text-16-regular mobile:body-text-14-regular text-text-primary">
                  {t('text:vietnamese')}
                </TextBase>
              ) : (
                <TextBase className="body-text-16-regular mobile:body-text-14-regular text-text-primary">
                  {t('text:english')}
                </TextBase>
              )}
            </div>
          </Space>
        </Drawer>
      </div>
    );
  }, [collapsed, keyActive, language, menuData, onClick, t, toggleCollapsed]);
  return (
    <div className="flex flex-row items-center justify-between bg-common-1000 px-32 py-8 tablet:justify-between tablet:px-36 mobile:justify-between mobile:px-36">
      <div>
        <IconSvgLocal name="IC_LOGO_TP" classNames="h-[84px] mobile:h-[64px]" />
      </div>
      <div className="flex items-center tablet:hidden mobile:hidden">
        {menuData?.map((e: any, i: number) => {
          return (
            <Link
              href={e.link}
              key={i}
              className={`${keyActive == e?.link ? activeClassName : inactiveClassName}`}
              // onClick={}
            >
              <Toggle
                className="z-50 mr-28"
                checked={keyActive == e?.link}
                onToggle={() => {
                  setKeyActive(e?.link);
                  router.push(e.link);
                }}
                label={e?.label}
                isTranslate
                handleDiameter={32}
                height={36}
                checkedHandleIcon={<IconSvgLocal name={e?.ic} classNames="h-16" />}
                uncheckedHandleIcon={<IconSvgLocal name={e?.ic} classNames="h-16" />}
                onColor="#DAE4C2"
                textActive="#383838"
                textColor="#383838"
                offColor="#EFEFEF"
              />
            </Link>
          );
        })}
      </div>
      <Button
        className="h-36 rounded-radius-xxxl bg-color-900 px-24 hover:text-text-primary tablet:hidden tablet:h-32 mobile:hidden mobile:h-28"
        name="contactNow"
        onClick={() => {}}
      >
        <TextBase className="text-common-1000" t18n="text:contact" preset="body-text-16-regular" />
      </Button>
      <div className="hidden tablet:block mobile:block">{menuInMobile()}</div>
    </div>
  );
});

const MenuCustom = memo(Component, isEqual);
export default MenuCustom;
