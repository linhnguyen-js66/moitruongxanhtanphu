import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { useRef } from 'react';

import { FooterApp } from '../footer';
import Menu from '../menu';

const { Content } = Layout;

interface AppLayoutProps extends LayoutProps {
  isHideBreadcrumb?: boolean;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const refMenu = useRef(null);
  return (
    <div className="flex min-h-[100vh] flex-col bg-color-100">
      <div className="flex flex-1 flex-col">
        <Menu ref={refMenu} />
        <div className="wrap_layout">
          <Content className="px-40 py-12 tablet:px-28">
            <>{children}</>
          </Content>
        </div>
      </div>
      <FooterApp />
    </div>
  );
}
