import HomeLayout from '@/layouts/home-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Meta title={AppConfig.site_name} description={AppConfig.description} />
      <div className="wrap_content_page">
        <div className="content_page">
          <div className="relative">
            <div className="relative z-10">lllllll</div>
          </div>
        </div>
      </div>
    </>
  );
};
Home.Layout = HomeLayout;

export default Home;
