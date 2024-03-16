import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { HeaderAboutPage } from './header';
import { MemberList } from './member-list';

const About = () => {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <HeaderAboutPage />
      <MemberList />
    </>
  );
};

About.Layout = AppLayout;
export default About;
