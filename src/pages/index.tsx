import { IconSvgLocal } from '@/components';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

const MaintainPage = () => {
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <IconSvgLocal
            name="IC_MAINTAIN"
            classNames="h-[300px] tablet:h-[200px] mobile:h-[100px]"
          />
          <div className="mt-24 text-center">
            <div className="h2 text-secondary-600 tablet:text-[24px] mobile:text-[16px]">
              Trang web đang được bảo trì
            </div>
            <div className="body3 mt-4 text-secondary-600 tablet:text-[13px] mobile:text-[12px]">
              Chúng tôi đang cố gắng khắc phục sự cố sớm nhất
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintainPage;
