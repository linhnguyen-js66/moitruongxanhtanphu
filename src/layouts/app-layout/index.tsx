import type { LayoutProps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES_MAPPING } from '@/config/routes';

export default function AppLayout({ children }: LayoutProps) {
  const refMenu = useRef(null);
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<
    {
      href: string;
      label: string;
    }[]
  >();
  const [t] = useTranslation();
  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0];
    if (pathWithoutQuery) {
      let pathArray = pathWithoutQuery.split('/');
      pathArray.shift();

      pathArray = pathArray.filter((path) => path !== '');
      console.log('dasd', pathArray);

      const breadcrumbs = pathArray.map((path, index) => {
        const href: any = `/${pathArray.slice(0, index + 1).join('/')}`;

        // @ts-ignore
        const key = Object.keys(ROUTES_MAPPING).find(
          (keyPath: any) => ROUTES_MAPPING[keyPath].path == href,
        );

        return {
          // @ts-ignore
          href: key ? ROUTES_MAPPING[key].path : href,
          // @ts-ignore
          label: key
            ? ROUTES_MAPPING[key].title
            : path.charAt(0).toUpperCase() + path.slice(1),
        };
      });

      breadcrumbs ? setBreadcrumbs(breadcrumbs) : null;
    }
  }, [router.asPath]);
}
