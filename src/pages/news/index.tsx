import HomeLayout from '@/layouts/home-layout';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

const News = () => {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {/* <ChatBox /> */}
    </>
  );
};

News.Layout = HomeLayout;
export default News;
