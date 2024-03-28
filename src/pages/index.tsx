import HomeLayout from '@/layouts/home-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import type { NextPageWithLayout } from './_app';
import { HomePage } from './home';

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />
      <HomePage isLoading={props?.loading} />
    </>
  );
};
Home.Layout = HomeLayout;

export default Home;
