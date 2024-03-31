import HomeLayout from '@/layouts/home-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

import { ListNews } from './list-news';

const News = () => {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <ListNews />
    </>
  );
};

News.Layout = HomeLayout;
export default News;
