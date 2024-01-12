import { Layout } from 'antd';
import router from 'next/router';

import { IconSvgLocal, TextBase } from '@/components';
import { ROUTES } from '@/config/routes';

const { Header } = Layout;
interface propsMenu {
  onClickMenu?: () => void;
}

const HeaderApp = (props: propsMenu) => {
  // const userInfo: UserInfo | null = useSelector(selectUserInfo) || null;
  return (
    <Header className="header_home_page">
      <div className="tablet:justify-between flex w-full justify-end">
        <div className="tablet:flex mobile:gap-12 hidden items-center gap-16">
          <IconSvgLocal
            // height={32}
            // width={32}
            name="IC_MENU_OPEN"
            classNames="w-32 h-32 mobile:w-24 mobile:h-24"
            onClick={() => {
              props.onClickMenu && props.onClickMenu();
            }}
          />

          <IconSvgLocal
            classNames="w-[68px] h-[31px] mobile:h-24 mobile:w-[53]"
            name="LOGO_PVCOMBANK_HEADER_HOME"
            onClick={() => {
              router.push(ROUTES.HOME);
            }}
          />
        </div>
        <div className="flex items-center gap-20">
          <div className="flex items-center">
            <div className="flex items-center justify-items-center gap-8">
              <div className="text-right">
                <TextBase className="body1" t18n="Xin chào" />
                <TextBase className="body2">
                  {/* {userInfo?.FullName ?? 'Nguyen Van A'} */}
                </TextBase>
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                }}
                onClick={(e) => e.preventDefault()}
              >
                {/* <Image
                  src={userInfo?.UserImageURL || AVATAR}
                  alt="AVATAR"
                  fill
                  className="rounded-radius-xxl border-color-300 border object-cover"
                /> */}
              </div>
            </div>
          </div>
          <div className="bg-color-50 tablet:bg-color-300 h-[40px] w-[1px]" />
          {/* <AppNotificationBoard /> */}
        </div>
      </div>
    </Header>
  );
};

export { HeaderApp };
