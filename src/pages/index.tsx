import { IconSvgLocal } from '@/components';
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
            <div className="relative z-10">
              <div className="flex h-screen w-screen flex-col items-center justify-center">
                <div className="over-hidden flex h-[700px] w-[700px] flex-col items-center justify-center rounded-[50%] bg-secondary-50 p-32 text-center">
                  <IconSvgLocal height={300} name="IC_MAINTAIN" />
                  <div className="h2 mt-24 text-secondary-600 ">Trang web đang được bảo trì</div>
                  <div className="body3 mt-4 text-secondary-600 ">
                    Chúng tôi đang cố gắng khắc phục sự cố sớm nhất
                  </div>
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Home.Layout = HomeLayout;

export default Home;
