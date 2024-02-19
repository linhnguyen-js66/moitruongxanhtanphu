import { Dropdown, Layout } from 'antd';
import { t } from 'i18next';

import { ButtonBase, TextBase } from '@/components';
import { showDialog } from '@/components/dialog';
import { TYPE_ACTION } from '@/components/dialog/type';

const { Header } = Layout;
interface propsMenu {
  onClickMenu?: () => void;
}

const HeaderApp = (props: propsMenu) => {
  // const cacheLogin: CachedUserState = useSelector(selectCacheLogin);
  // const { _logout } = useLogout();
  return (
    <Header className="header_home_page">
      <div className="flex w-full justify-end tablet:justify-between">
        <div className="hidden items-center gap-16 tablet:flex mobile:gap-12" />
        <div className="flex items-center gap-20">
          <div className="flex items-center">
            <Dropdown
              dropdownRender={(menuInstance) => {
                return <>{menuInstance}</>;
              }}
              menu={{
                className: '!p-0 !rounded-radius-m',
                items: [
                  {
                    className: '!p-[0px]',
                    key: '1',
                    label: (
                      <ButtonBase
                        name="comfirm_logout"
                        onlyWrap
                        className="flex cursor-pointer gap-12 p-12"
                      >
                        <TextBase className="body3" t18n="home_screen:logout" />
                      </ButtonBase>
                    ),

                    onClick: () => {
                      showDialog({
                        title: t('home_screen:logout'),
                        content: t('home_screen:logout_msg'),
                        actions: [
                          {
                            title: t('home_screen:logout'),
                            // onPress: _logout,
                          },
                          {
                            title: t('home_screen:cancel'),
                            type: TYPE_ACTION.SECONDARY,
                          },
                        ],
                      });
                    },
                  },
                ],
              }}
              trigger={['click']}
            >
              <div className="flex w-[182px] items-center justify-end justify-items-center gap-8">
                <div className="text-right">
                  <TextBase
                    className="body1 text-color-700"
                    t18n="home_screen:hello"
                    presetMobile="caption1"
                  />
                </div>
                <div
                  className="relative size-40 cursor-pointer overflow-hidden rounded-[50%] tablet:size-36 mobile:size-[29px]"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
            </Dropdown>
          </div>
          <div className="h-[40px] w-[1px] bg-color-50 tablet:bg-color-300" />
        </div>
      </div>
    </Header>
  );
};

export { HeaderApp };
