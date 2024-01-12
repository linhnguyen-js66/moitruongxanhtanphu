// eslint-disable-next-line import/no-extraneous-dependencies
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';

import { TextBase } from '@/components';
import { IconSvgLocal } from '@/components/icon-vec-local';
import { ROUTES } from '@/config/routes';
import useScreenResize from '@/hooks/useScreenResize';
import { selectLanguage } from '@/stores/globalSlice';
import { changeLanguage } from '@/utils/i18n/i18n';

const { Sider } = Layout;

const MenuNav = forwardRef((props, ref) => {
  const language = useSelector(selectLanguage);
  useEffect(() => {
    changeLanguage(language);
  }, []);
  const [keyActive, setKeyActive] = useState('');
  const router = useRouter();
  const typeDevice = useScreenResize();

  const [collapsed, setCollapsed] = useState(false);

  const onShowHideMenu = () => {
    setCollapsed(!collapsed);
  };

  useImperativeHandle(ref, () => ({
    onShowHideMenu,
  }));

  useEffect(() => {
    if (typeDevice == 'desktop') {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [typeDevice, router.pathname]);

  const menu: any = [
    {
      icon: 'ICON_HOME',
      label: <TextBase t18n="text:homepage" />,
      link: ROUTES.HOME,
    },
    {
      label: 'COMPONENTS',
      link: ROUTES.COMPONENT,
    },
  ];
  useEffect(() => {
    // Get the current route from the router
    const currentRoute = router.pathname;
    // Find the corresponding menu item and set its key as the active key
    const activeMenuItem = menu.find((item: any) => currentRoute === item.link);
    if (activeMenuItem) {
      setKeyActive(String(menu.indexOf(activeMenuItem) + 1));
    }
  }, [router.pathname, menu]);
  return (
    <Sider
      breakpoint="xl"
      collapsedWidth="0"
      style={{
        overflow: 'auto',
        left: 0,
        top: 0,
        bottom: 0,
        maxWidth: 270,
      }}
      width={270}
      theme="light"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      collapsed={collapsed}
      className="sider_bar_table"
    >
      <div className="wrap_bar_menu">
        <IconSvgLocal
          height={43}
          name="LOGO_PVCOMBANK_HOME"
          classNames="cursor-pointer ml-24 mt-16 mb-32"
          onClick={() => {
            router.push(ROUTES.HOME);
          }}
        />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[keyActive]}
          style={{
            borderInlineEnd: 'none',
            maxWidth: 270,
          }}
          items={menu.map((e: any, index: number) => ({
            key: String(index + 1),
            label: (
              <div
                className={`menu-custom-item ${
                  e.icon ? 'menu-handle-active' : ''
                }`}
              >
                <div className="menu-custom-item-icon">
                  {e.icon ? (
                    <IconSvgLocal
                      name={e.icon}
                      height={24}
                      fill={
                        keyActive === String(index + 1)
                          ? ''
                          : 'rgb(var(--color-700)'
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={`menu-custom-item-label ${
                    e.icon ? '' : 'menu-handle-active'
                  }`}
                >
                  {e.label}
                </div>
              </div>
            ),
            onClick: () => {
              setKeyActive(String(index + 1));
              router.push(e.link);
            },
          }))}
        />
      </div>
      <div
        className="outside_sider"
        onClick={() => {
          typeDevice != 'desktop' && setCollapsed(!collapsed);
        }}
      />
    </Sider>
  );
});

export { MenuNav };
