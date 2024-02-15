import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { useRef } from 'react';

import { FooterApp } from '../footer';
import MenuCustom from '../menu';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);

  return (
    <div className="min-h-[100vh] bg-color-100">
      <div className="bg_home_page flex flex-col">
        <MenuCustom ref={refMenu} />
        <div className="wrap_layout">
          {/* <HeaderApp
            onClickMenu={() => {
              // @ts-ignore
              refMenu.current?.onShowHideMenu();
            }}
          /> */}
          <Content>
            <>{children}</>
          </Content>
        </div>
      </div>
      <FooterApp />
    </div>
  );
}
