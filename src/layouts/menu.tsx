import type { MenuProps } from 'antd';
import { Button, Divider, Drawer, Form, Input, message, Modal, Select, Space } from 'antd';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import parsePhoneNumberFromString from 'libphonenumber-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ZALO_QR from '@/assets/image/zalo-qr.jpeg';
import { JSONFiles } from '@/assets/json';
import type { IconSvgTypes } from '@/assets/svg';
import { ButtonBase, IconSvgLocal, TextBase } from '@/components';
import { Toggle } from '@/components/toggle';
import {
  K_BOSS_FIRST,
  K_BOSS_SECOND,
  K_EMAIL,
  K_HOTLINE_FIRST,
  K_HOTLINE_SECOND,
} from '@/config/constants';
import { ROUTES } from '@/config/routes';
import { useModal } from '@/hooks/useModal';
import type { FieldType } from '@/pages/home/project';
import { selectLanguage, setLanguage } from '@/stores/globalSlice';
import { changeLanguage } from '@/utils/i18n/i18n';

interface MenuNav {
  icon?: IconSvgTypes;
  label?: ReactNode;
  link?: string;
}
// eslint-disable-next-line react/display-name
const Component = forwardRef((props, ref) => {
  const [showMenu, setShowMenu] = useState<'active_menu' | 'inactive_menu'>('inactive_menu');
  const [keyActive, setKeyActive] = useState('');
  const language = useSelector(selectLanguage);
  const [collapsed, setCollapsed] = useState(false);
  const { showModal, handleCancel, isModalOpen } = useModal();
  const router = useRouter();
  const dispatch = useDispatch();
  const onShowHideMenu = useCallback(() => {
    const status = showMenu == 'active_menu' ? 'inactive_menu' : 'active_menu';
    setShowMenu(status);
  }, [showMenu]);
  useImperativeHandle(ref, () => ({
    onShowHideMenu,
  }));
  const [isVietnamese, setIsVietnamese] = useState(true);
  const { t } = useTranslation();
  const activeClassName = 'body-text-16-bold text-primary-700 mobile:body-text-14-bold';
  const inactiveClassName = 'body-text-16-regular text-text-primary mobile:body-text-14-regular';
  const menuData: MenuNav[] = useMemo(
    () => [
      {
        label: 'text:home',
        link: ROUTES.HOME,
        ic: 'IC_HOME',
      },
      {
        label: 'text:about',
        link: ROUTES.ABOUT,
        ic: 'IC_PROJECT',
      },
      {
        label: 'text:news',
        link: ROUTES.NEWS,
        ic: 'IC_NEWS',
      },
    ],
    []
  );

  const onClick: MenuProps['onClick'] = useCallback(() => {
    if (!isVietnamese) {
      setIsVietnamese(true);
      dispatch(setLanguage('vi'));
      changeLanguage('vi');
      return;
    }
    setIsVietnamese(false);
    dispatch(setLanguage('en'));
    changeLanguage('en');
  }, [dispatch, isVietnamese]);
  useEffect(() => {
    // Get the current route from the router
    const currentRoute = router.pathname;
    // Find the corresponding menu item and set its key as the active key
    const activeMenuItem = menuData.find((item: any) => currentRoute === item.link);
    if (activeMenuItem) {
      setKeyActive(activeMenuItem.link);
    }
  }, [router.pathname, menuData]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const menuInMobile = useCallback(() => {
    return (
      <div onClick={toggleCollapsed}>
        <IconSvgLocal name="IC_MENU" height={32} />
        <Drawer open={collapsed} closable={false}>
          <Space className="mb-[42px] flex items-center justify-between">
            <IconSvgLocal name="IC_LOGO_V2" height={32} />
            <ButtonBase
              leftIcon="IC_CLOSE"
              heightIcon={48}
              widthIcon={48}
              styles={{ height: 32, borderRadius: 6, backgroundColor: 'transparent' }}
              type="primary"
              onClick={toggleCollapsed}
              name="close"
            />
          </Space>
          <Space className="flex flex-col items-start">
            {menuData?.map((e: any, i: number) => {
              return (
                <Link
                  href={e.link}
                  key={i}
                  className={`${keyActive == e?.link ? activeClassName : 'body-text-16-medium mobile:body-text-14-medium text-text-primary'}`}
                >
                  <div className={`${i == menuData?.length - 1 ? 'mb-4' : 'mb-24'}`}>
                    {t(e?.label)}
                  </div>
                </Link>
              );
            })}
          </Space>
          <Divider />
          <Space className="flex items-center justify-between">
            <div className="body-text-16-medium mobile:body-text-14-medium text-text-primary">
              {t('text:language')}
            </div>
            <div className="flex items-center" onClick={onClick}>
              <IconSvgLocal
                name={language == 'vi' ? 'IC_VIETNAM' : 'IC_ENGLISH'}
                classNames="h-24 mr-8"
              />
              {language == 'vi' ? (
                <TextBase className="body-text-16-regular mobile:body-text-14-regular text-text-primary">
                  {t('text:vietnamese')}
                </TextBase>
              ) : (
                <TextBase className="body-text-16-regular mobile:body-text-14-regular text-text-primary">
                  {t('text:english')}
                </TextBase>
              )}
            </div>
          </Space>
          <TextBase
            className="mt-32 text-color-900"
            t18n="text:contact"
            preset="body-text-16-medium"
            // presetMobile="body-text-14-medium"
            onClick={() => showModal()}
          />
        </Drawer>
      </div>
    );
  }, [collapsed, keyActive, language, menuData, onClick, t, toggleCollapsed]);
  const [form] = Form.useForm();
  const [listPurpose, setListPurpose] = useState<any>([]);
  const { flagCountry } = JSONFiles;
  const countryData = JSONFiles.country;
  const countryList = useMemo(() => {
    const data = [] as any;
    countryData?.map((item: any) => {
      const findItem = flagCountry.find((el) => el?.code?.toUpperCase() == item?.code);
      if (findItem) {
        data.push({
          label: item?.dial_code,
          value: item?.dial_code,
          icon: findItem?.flag,
          id: item?.code,
          ...findItem,
        });
      } else {
        data.push({
          label: item?.dial_code,
          value: item?.dial_code,
          id: item?.code,
        });
      }
    });
    return data;
  }, [countryData, flagCountry]);
  const [selectPurpose, setSelectPurpose] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectNation, setSelectNation] = useState<any>({});
  const onUpload = useCallback(
    async (value: any) => {
      const { address, companyName, countryCode, email, phoneNumber } = value;
      setLoading(true);
      await addDoc(collection(db, 'company_support'), {
        address,
        companyName,
        countryCode,
        email,
        phoneNumber,
        nation: selectNation,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          message.success('Gửi yêu cầu báo giá thành công');
          handleCancel();
        })
        .catch((error) => {
          message.error('Gửi yêu cầu thất bại');
        })
        .finally(() => {
          setLoading(false);
          form.resetFields();
        });
    },
    [form, handleCancel, selectNation]
  );
  const handleNation = useCallback(
    (value: any) => {
      const findItem = countryList.find((item: any) => item?.value == value);
      setSelectNation(findItem);
    },
    [countryList]
  );
  const onHandlePurpose = useCallback(
    (value: any) => {
      const findItem = listPurpose?.find((item: any) => item?.value == value);
      setSelectPurpose(findItem);
    },
    [listPurpose]
  );

  const getListPurpose = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'purpose'));
    const purposesArray = querySnapshot.docs.map((doc) => ({
      documentID: doc.id,
      ...doc.data(),
      value: language == 'vi' ? doc?.data().content?.vi : doc?.data().content?.en,
    }));
    setListPurpose(purposesArray);
  }, [language]);
  useEffect(() => {
    getListPurpose();
  }, [getListPurpose]);
  const onCancel = useCallback(() => {
    handleCancel();
    form.resetFields();
  }, []);
  const prefixSelector = (
    <Form.Item name="countryCode" noStyle>
      <Select
        defaultValue={selectNation}
        onChange={handleNation}
        style={{ width: 90 }}
        placeholder={t('text:pld_enter_phone')}
        optionFilterProp="children"
      >
        {countryList?.map((item, index) => (
          <Option key={index} value={item?.value}>
            <div className="flex flex-1 items-center justify-between">
              <TextBase preset="body-text-14-semibold">{item?.label}</TextBase>
              {item?.emoji && <div>{item?.emoji}</div>}
            </div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const renderContact = useCallback(() => {
    return (
      <div className="mt-16 w-full">
        <Form
          form={form}
          initialValues={{
            address: '',
            phoneNumber: '',
            companyName: '',
            email: '',
            content: '',
          }}
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true, countryCode: countryList?.[0]?.value }}
          onFinish={onUpload}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label={t('text:your_company')}
            name="companyName"
            rules={[{ required: true, message: t('validate:not_empty') }]}
          >
            <Input placeholder={t('text:your_company')} />
          </Form.Item>
          <Form.Item
            label={t('text:address_comp')}
            name="address"
            rules={[{ required: true, message: t('validate:not_empty') }]}
          >
            <Input placeholder={t('text:address_comp')} />
          </Form.Item>
          <Form.Item
            label={t('text:email_comp')}
            name="email"
            rules={[
              { required: true, message: t('validate:not_empty') },
              { type: 'email', message: t('validate:error_email') },
            ]}
          >
            <Input placeholder={t('text:email_comp')} />
          </Form.Item>
          <Form.Item
            label={t('text:phone_number')}
            name="phoneNumber"
            dependencies={['countryCode']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const code = getFieldValue('countryCode');
                  const fullNumber = `${code}${value}`;

                  const phoneNumber = parsePhoneNumberFromString(fullNumber);
                  if (!value) {
                    return Promise.reject(new Error(t('validate:not_empty')));
                  }
                  if (!phoneNumber || !phoneNumber.isValid() || isNaN(value)) {
                    return Promise.reject(new Error(t('validate:error_phone')));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            {/* <Input.Group compact> */}
            {/*  */}
            <Input
              type="tel"
              addonBefore={prefixSelector}
              placeholder={t('text:pld_enter_phone')}
              className="grow"
            />
            {/* </Input.Group> */}
          </Form.Item>
          <Form.Item<FieldType>
            name="purpose"
            label={t('text:service')}
            rules={[{ required: true, message: t('validate:not_empty') }]}
          >
            <Select
              onChange={onHandlePurpose}
              options={listPurpose}
              style={{ width: '100%' }}
              placeholder={t('text:select_service')}
              optionFilterProp="children"
            />
          </Form.Item>
          {selectPurpose && (
            <TextBase
              style={{ fontStyle: 'italic' }}
              preset="body-text-16-semibold"
              presetMobile="body-text-14-semibold"
              className="mb-32 text-primary-500"
            >
              {selectPurpose?.value}
            </TextBase>
          )}
          <Form.Item<FieldType>
            label={t('text:content')}
            name="content"
            rules={[{ required: true, message: t('validate:not_empty') }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              loading={loading}
              disabled={loading}
              name="close_btn"
              style={{
                backgroundColor: 'rgb(var(--primary-200))',
                height: 44,
                paddingLeft: 32,
                paddingRight: 32,
              }}
              htmlType="submit"
              className="background-btn"
            >
              {t('text:suggest_price')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }, [
    countryList,
    form,
    listPurpose,
    loading,
    onHandlePurpose,
    onUpload,
    prefixSelector,
    selectPurpose,
    t,
  ]);
  const renderEmail = useCallback(() => {
    return (
      <div className="flex flex-col">
        <TextBase t18n="text:contact" className="body-text-18-regular mb-24 text-primary-800" />
        <TextBase className="body-text-16-light mb-24 text-text-primary">
          {K_BOSS_FIRST}: {K_HOTLINE_FIRST}
        </TextBase>
        <TextBase className="body-text-16-light mb-24 text-text-primary">
          {K_BOSS_SECOND}: {K_HOTLINE_SECOND}
        </TextBase>
        <TextBase className="body-text-16-light mb-24 text-text-primary">
          {t('text:email')}: {K_EMAIL}
        </TextBase>
      </div>
    );
  }, []);
  return (
    <div className="flex flex-row items-center justify-between bg-common-1000 px-32 py-8 tablet:justify-between tablet:px-36 mobile:justify-between mobile:px-36">
      <div>
        <IconSvgLocal name="IC_LOGO_TP" classNames="h-[84px] mobile:h-[64px]" />
      </div>
      <div className="flex items-center tablet:hidden mobile:hidden">
        {menuData?.map((e: any, i: number) => {
          return (
            <Link
              href={e.link}
              key={i}
              className={`${keyActive == e?.link ? activeClassName : inactiveClassName}`}
              // onClick={}
            >
              <Toggle
                className="z-50 mr-28"
                checked={keyActive == e?.link}
                onToggle={() => {
                  setKeyActive(e?.link);
                  router.push(e.link);
                }}
                label={e?.label}
                isTranslate
                handleDiameter={32}
                height={36}
                checkedHandleIcon={<IconSvgLocal name={e?.ic} classNames="h-16" />}
                uncheckedHandleIcon={<IconSvgLocal name={e?.ic} classNames="h-16" />}
                onColor="#DAE4C2"
                textActive="#383838"
                textColor="#383838"
                offColor="#EFEFEF"
              />
            </Link>
          );
        })}
      </div>
      <Button
        className="h-36 rounded-radius-xxxl bg-color-900 px-24 hover:text-text-primary tablet:hidden tablet:h-32 mobile:hidden mobile:h-28"
        name="contactNow"
        onClick={() => showModal()}
      >
        <TextBase className="text-common-1000" t18n="text:contact" preset="body-text-16-regular" />
      </Button>
      <div className="hidden tablet:block mobile:block">{menuInMobile()}</div>
      <Modal
        open={isModalOpen}
        centered
        onCancel={onCancel}
        footer={[]}
        title={t('text:contact_now')}
        width={1000}
      >
        <div className="mt-32 flex mobile:flex-col mobile:flex-col-reverse">
          <div className="flex flex-1">{renderContact()}</div>
          <div className="ml-32 flex flex-1 justify-between mobile:ml-0">
            {renderEmail()}
            <div>
              <Image
                src={ZALO_QR}
                width={200}
                height={200}
                alt="Công ty môi trường xanh Tân Phú-tiêu huỷ hàng hoá theo yêu cầu"
                loading="lazy"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

const MenuCustom = memo(Component, isEqual);
export default MenuCustom;
