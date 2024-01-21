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
  // const router = useRouter();
  // const [breadcrumbs, setBreadcrumbs] = useState<
  //   {
  //     href: string;
  //     label: string;
  //   }[]
  // >();

  // const [t] = useTranslation();

  // useEffect(() => {
  //   if (isHideBreadcrumb) return;
  //   const pathWithoutQuery = router.asPath.split('?')[0];
  //   if (pathWithoutQuery) {
  //     let pathArray = pathWithoutQuery.split('/');
  //     pathArray.shift();

  //     pathArray = pathArray.filter((path) => path !== '');
  //     console.log('dasd', pathArray);

  //     const breadcrumbs = pathArray.map((path, index) => {
  //       const href: any = `/${pathArray.slice(0, index + 1).join('/')}`;

  //       // @ts-ignore

  //       const key = Object.keys(ROUTES_MAPPING).find(
  //         (keyPath: string) => ROUTES_MAPPING[keyPath].path == href
  //       );

  //       return {
  //         // @ts-ignore
  //         href: key ? ROUTES_MAPPING[key].path : href,
  //         // @ts-ignore
  //         label: key ? ROUTES_MAPPING[key].title : path.charAt(0).toUpperCase() + path.slice(1),
  //       };
  //     });

  //     breadcrumbs ? setBreadcrumbs(breadcrumbs) : null;
  //   }
  // }, [router.asPath, isHideBreadcrumb]);
  return (
    <div className="flex min-h-[100vh] flex-col bg-color-100">
      <div className="flex flex-1 flex-col">
        <Menu ref={refMenu} />
        <div className="wrap_layout">
          {/* <HeaderApp
            onClickMenu={() => {
              // @ts-ignore
              refMenu.current?.onShowHideMenu();
            }}
          /> */}
          <Content className="px-40 py-12 tablet:px-28">
            <>{children}</>
          </Content>
        </div>
      </div>
      <FooterApp />
    </div>
  );
}
