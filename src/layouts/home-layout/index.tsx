import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { useRef } from 'react';

const { Content } = Layout;

export default function HomeLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);

  return (
    <div className="min-h-[100vh] bg-color-100">
      <div className="bg_home_page flex">
        {/* <Menu ref={refMenu} /> */}
        <div className="wrap_layout">
          {/* <HeaderApp
            onClickMenu={() => {
              // @ts-ignore
              refMenu.current?.onShowHideMenu();
            }}
          /> */}
          <Content className="bg_home_content px-40 py-12 tablet:px-28">
            <>{children}</>
          </Content>
        </div>
      </div>
      {/* <FooterApp /> */}
    </div>
    // <Layout style={{ minHeight: '100vh' }} >
    //   <Layout>
    //     <MenuNav ref={refMenu}/>
    //     <Layout className="tablet:ml-[0] bg_home_page">
    //       <HeaderApp onClickMenu={() => {
    //         //@ts-ignore
    //         refMenu.current?.onShowHideMenu()
    //       }}/>
    //       <Content className="px-40 py-12 tablet:px-28 bg_home_content">
    //         <>
    //           {children}
    //         </>
    //       </Content>
    //     </Layout>
    //   </Layout>
    //   <FooterApp />
    // </Layout>
  );
}
