import type { MenuProps } from 'antd';
import { Divider, Drawer, Dropdown, Space } from 'antd';
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
        label: <TextBase t18n="text:home" />,
        link: ROUTES.HOME,
      },
      {
        label: <TextBase t18n="text:about" />,
        link: ROUTES.ABOUT,
      },
      {
        label: <TextBase t18n="text:project" />,
        link: ROUTES.PROJECT,
      },
      {
        label: <TextBase t18n="text:services" />,
        link: ROUTES.SERVICES,
      },
      {
        label: <TextBase t18n="text:contact" />,
        link: ROUTES.CONTACT,
      },
    ],
    [keyActive]
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
          <Space className="mb-[42px] flex justify-between">
            <IconSvgLocal name="IC_LOGO_TP" classNames="h-[36px]" />
            <ButtonBase
              leftIcon="IC_CLOSE"
              heightIcon={32}
              widthIcon={32}
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
                    {e?.label}
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
  }, [collapsed, keyActive, language, menuData, t, toggleCollapsed]);
  return (
    <div className="flex flex-row items-center justify-around bg-common-1000 py-16 tablet:justify-between tablet:px-36 mobile:justify-between mobile:px-36">
      <div>
        <IconSvgLocal name="IC_LOGO_TP" classNames="h-[42px] mobile:h-[36px]" />
      </div>
      <div className="flex items-center tablet:hidden mobile:hidden">
        {menuData?.map((e: any, i: number) => {
          return (
            <Link
              href={e.link}
              key={i}
              className={`${keyActive == e?.link ? activeClassName : inactiveClassName}`}
            >
              <div className="pr-32">{e?.label}</div>
            </Link>
          );
        })}
      </div>
      <Dropdown menu={{ items: optionLanguage, onClick }} className="tablet:hidden mobile:hidden">
        <div onClick={(e) => e.preventDefault()} className="flex items-center">
          <IconSvgLocal
            name={language == 'vi' ? 'IC_VIETNAM' : 'IC_ENGLISH'}
            classNames="h-[24px] mobile:h-[18px] tablet:h-[20px]"
          />
          <div className="body-text-16-regular px-8 text-text-primary">{t('text:language')}</div>
          <IconSvgLocal name="IC_ARROW_DOWN" classNames="h-[16px] mobile:h-[12px]" />
        </div>
      </Dropdown>
      <div className="hidden tablet:block mobile:block">{menuInMobile()}</div>
    </div>
  );
});

const MenuCustom = memo(Component, isEqual);
export default MenuCustom;
