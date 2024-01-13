import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { TextBase } from '@/components';
import { ROUTES } from '@/config/routes';

const Menu = forwardRef((props, ref) => {
  const [showMenu, setShowMenu] = useState<'active_menu' | 'inactive_menu'>('inactive_menu');
  const [keyActive, setKeyActive] = useState('');
  const router = useRouter();

  const onShowHideMenu = () => {
    const status = showMenu == 'active_menu' ? 'inactive_menu' : 'active_menu';
    setShowMenu(status);
  };

  useImperativeHandle(ref, () => ({
    onShowHideMenu,
  }));

  const menu: any = [
    {
      icon: 'ICON_HOME',
      label: <TextBase t18n="menu:homepage" className="title4" presetMobile="sub-title1" />,
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
      setKeyActive(activeMenuItem.link);
    }
  }, [router.pathname, menu]);

  return (
    <div className={`menu_sider ${showMenu}`} onClick={onShowHideMenu}>
      <div className="content_menu h-full bg-primary-300">
        <div className="mobile:pt-20s flex w-full justify-center pt-28">
          {/* <IconSvgLocal
            name=""
            classNames="cursor-pointer h-[64px] mobile:h-32"
            onClick={() => {
              router.push(ROUTES.HOME);
            }}
          /> */}
        </div>

        <div className="mt-[56px] px-32 mobile:mt-12 mobile:px-12">
          {menu.map((e: any, i: number) => {
            return (
              <Link
                href={e.link}
                key={i}
                className={`menu-custom-item ${e.icon ? 'menu-handle-active' : ''} flex ${
                  keyActive == e.link ? 'active' : ''
                }`}
              >
                <div className="menu-custom-item-icon">
                  {e.icon ? null : (
                    // <IconSvgLocal
                    //   name={e.icon}
                    //   height={24}
                    //   classNames="cursor-pointer h-24 mobile:h-20"
                    // />
                    <></>
                  )}
                </div>
                <div className="menu-custom-item-label">{e.label}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Menu;
