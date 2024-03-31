import HomeLayout from '@/layouts/home-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { HeaderAboutPage } from './header';
import { Intro } from './intro';
import { MemberList } from './member-list';

const About = () => {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <HeaderAboutPage />
      <Intro />
      <MemberList />
    </>
  );
};

About.Layout = HomeLayout;
export default About;
