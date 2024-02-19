import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { useRef } from 'react';

import { FooterApp } from '../footer';
import MenuCustom from '../menu';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);

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
      <FooterApp />
    </div>
  );
}
