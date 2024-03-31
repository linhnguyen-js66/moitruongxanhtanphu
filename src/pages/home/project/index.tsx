import 'react-slideshow-image/dist/styles.css';

import { Button, Form, Input, Modal, Select } from 'antd';
import parsePhoneNumberFromString from 'libphonenumber-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Slide } from 'react-slideshow-image';

import BANNER_ENV from '@/assets/image/moitruong.jpg';
import { ButtonBase, IconSvgLocal, TextBase } from '@/components';
import { TYPE_CONTENT, useProject } from '@/hooks/useProject';
import useScreenResize from '@/hooks/useScreenResize';

export type FieldType = {
  address?: string;
  phoneNumber?: string;
  companyName?: string;
  email?: string;
  purpose?: string;
  content?: string;
};
const Component = (props: any) => {
  const {
    isActive,
    isModalOpen,
    onCancel,
    content,
    onSelectContent,
    countryList,
    selectNation,
    onUpload,
    handleNation,
    loading,
    form,
    purpose: listPurpose,
    onHandlePurpose,
    selectPurpose,
  } = useProject(props);
  const typeDevice = useScreenResize();
  const router = useRouter();
  useEffect(() => {
    if (typeDevice == 'mobile') {
      setConfigShow({
        slidesToScroll: 1,
        slidesToShow: 1,
      });
    }
  }, [typeDevice]);
  const { t } = useTranslation();
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 3,
    slidesToShow: 3,
  });
  const indicators = (index: any) => <div className="indicator_side" key={index} />;
  const renderHeader = useCallback(() => {
    return (
      <div className={`${isActive ? 'fly' : ''} flex flex-row justify-between mobile:flex-col`}>
        <div className="w-1/4 mobile:mb-16 mobile:w-full">
          <TextBase
            t18n="text:project_content"
            preset="body-text-18-medium"
            className="text-color-500 mobile:text-center"
            presetMobile="body-text-16-medium"
          />
        </div>
        {/* <div className="flex flex-col items-end bg-primary-100 mobile:items-start"> */}
        <div className="flex flex-col items-end justify-end mobile:items-center">
          <div className="w-[65%] mobile:w-full">
            <TextBase
              t18n="text:project_content_next"
              preset="body-text-48-light"
              presetMobile="body-text-24-light"
              className="text-right mobile:text-center"
            />
          </div>

          <div className="mt-32 flex flex-1">
            <ButtonBase
              classNames="px-36 h-44 rounded-radius-xxxl hover:shadow-down-s hover:shadow-color-300 body-text-16-regular bg-primary-100 hover:text-color-900"
              name="btnProject"
              onClick={() => router.push('/about')}
              t18n="text:about_comp"
              type="secondary"
            />

            <ButtonBase
              classNames="ml-12 flex h-46 items-center justify-center border-weight-none body-text-16-regular bg-color-transparent hover:bg-color-transparent"
              name="btnProject"
              onClick={() => router.push('/about')}
              t18n="text:project_highlight"
              rightIcon="IC_ARROW_RIGHT"
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }, [isActive]);

  const renderBody = useCallback(() => {
    return (
      <div className="my-48 mobile:flex mobile:w-full mobile:justify-between">
        <ButtonBase
          classNames="px-36 h-44 rounded-radius-xxxl hover:shadow-down-s hover:shadow-color-300 body-text-16-regular"
          name="btnProject"
          onClick={() => {}}
          t18n="text:project"
          type="ghost"
        />
        <div
          className={`${isActive ? 'item-animation' : ''} mt-24 w-[55%] mobile:ml-16 mobile:mt-0 mobile:w-[70%]`}
        >
          <TextBase
            preset="body-text-48-light"
            presetMobile="body-text-24-light"
            className="mobile:text-right"
          >
            {t('text:project_content_last')}
            <span className="rounded-radius-4xl bg-primary-100 px-16">{t('text:vietnam')}</span>
          </TextBase>
        </div>
      </div>
    );
  }, [t, isActive]);

  const buttonViewMore = useCallback(
    (link: string) => (
      <ButtonBase
        classNames="bg-color-transparent flex items-center border-weight-none p-0 hover:bg-color-transparent hover:text-color-900"
        name="project"
        onClick={() => onSelectContent(link)}
        customContent={
          <div className="flex items-center">
            {link == TYPE_CONTENT.TUVAN ? (
              <TextBase t18n="text:view_quodation" preset="body-text-16-regular" className="mr-8" />
            ) : (
              <TextBase t18n="text:view_more" preset="body-text-16-regular" className="mr-8" />
            )}
            <div className="flex size-32 items-center justify-center rounded-[100%] bg-common-1000">
              <IconSvgLocal name="IC_ARROW_DOWN" classNames="-rotate-90" height={16} />
            </div>
          </div>
        }
      />
    ),
    [onSelectContent]
  );
  const renderFooter = useCallback(() => {
    return (
      <Slide
        slidesToScroll={configShow.slidesToScroll}
        slidesToShow={configShow.slidesToShow}
        indicators={indicators}
        autoplay={false}
        prevArrow={<div />}
        nextArrow={<div />}
        infinite={false}
        canSwipe
        cssClass={`${isActive ? 'fly' : ''}`}
      >
        {/** 1 */}
        <div className="pr-12 mobile:pr-0">
          <div className="flex w-full flex-col rounded-radius-xxxl bg-color-100 p-24">
            <div className="flex justify-center">
              <div className="mr-16 flex flex-col justify-between">
                <div>
                  <div className="w-[60%] mobile:w-full">
                    <TextBase t18n="text:waste_management" preset="body-text-24-light" />
                  </div>
                  <div className="mt-12">
                    <TextBase preset="body-text-16-light" t18n="text:note_waste_management" />
                  </div>
                </div>
                <div className="mt-16">{buttonViewMore(TYPE_CONTENT.XU_LY_TC)}</div>
              </div>
              <div className="img-custom rounded-radius-xxl">
                <Image
                  fill
                  className="img-inner object-scale-down"
                  src={BANNER_ENV}
                  alt="Công ty môi trường xanh Tân Phú dịch vụ tiêu huỷ hàng hoá tư vấn môi trường kinh doanh nhập khẩu phế liệu"
                  loading="lazy"
                  placeholder="blur"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
        {/** 2 */}
        <div className="size-full pr-12 mobile:pr-0">
          <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-radius-xxxl bg-primary-100 p-24 mobile:w-full">
            <div className="relative overflow-hidden">
              <div className="absolute flex h-full flex-col justify-center px-16 py-4">
                <TextBase t18n="text:support_env" preset="body-text-24-light" />
                <TextBase t18n="text:support_env_v2" preset="body-text-24-light" />
              </div>
              <IconSvgLocal name="IC_FRAME_WHITE" height={90} />
            </div>
            <div className="z-50">{buttonViewMore(TYPE_CONTENT.TUVAN)}</div>
            <div className="absolute -bottom-32 -left-32 rounded-radius-5xl">
              <IconSvgLocal name="IC_CIRCLE" height={200} classNames="" />
            </div>
          </div>
        </div>
        {/** 3 */}
        <div className="size-full pr-12 mobile:pr-0">
          <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-radius-xxxl bg-primary-100 p-24 mobile:w-full">
            <div className="w-3/5 rounded-radius-xxl bg-common-1000 p-16">
              <TextBase t18n="text:sale_env" preset="body-text-24-light" />
            </div>
            <div className="z-50">{buttonViewMore(TYPE_CONTENT.KINHDOANH)}</div>
            <div className="absolute -bottom-32 -left-32 rounded-radius-5xl">
              <IconSvgLocal name="IC_CIRCLE" height={200} classNames="" />
            </div>
          </div>
        </div>
      </Slide>
    );
  }, [buttonViewMore, configShow.slidesToScroll, configShow.slidesToShow, isActive]);
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

  return (
    <div className="mt-[64px] px-32">
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
      <Modal
        // title={content?.title}
        open={isModalOpen}
        centered
        onCancel={onCancel}
        width={600}
        footer={[]}
      >
        <div className="flex flex-col items-center">
          <TextBase preset="body-text-24-semibold">{content?.title}</TextBase>
          <div className="h-16" />
          <div className="body-text-16-light">{content?.content}</div>

          <div className="body-text-16-light mt-16 w-full">{content?.content2}</div>
          <div className="body-text-16-light mt-16 w-full">{content?.content3}</div>
          {content?.img && (
            <div className="mt-32">
              <Image
                height={300}
                src={content?.img}
                className="rounded-radius-l"
                alt="Xử lý tái chế rác thải tư vấn môi trường tiêu huỷ hàng hoá nhập khẩu phế liệu Môi trường xanh Tân Phú"
                loading="lazy"
                placeholder="blur"
                sizes="100vw"
              />
            </div>
          )}
          {content?.type == TYPE_CONTENT.KINHDOANH && (
            <div className="flex w-full items-center justify-between">
              {[t('text:kimloai'), t('text:nhua'), t('text:giay')].map((el, index) => (
                <div
                  className={`item-animation w-full rounded-radius-m border-weight-l border-primary-700 p-16 text-center ${index % 2 != 0 ? 'mx-16' : ''}`}
                  key={index}
                >
                  <TextBase
                    className="text-primary-600"
                    preset="body-text-16-semibold"
                    presetMobile="body-text-14-semibold"
                  >
                    {el}
                  </TextBase>
                </div>
              ))}
            </div>
          )}
          {content?.form && (
            <div className="mt-16 w-full">
              <Form
                form={form}
                initialValues={{
                  address: '',
                  phoneNumber: '',
                  companyName: '',
                  email: '',
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
          )}
        </div>
      </Modal>
    </div>
  );
};
export const ProjectHighLight = memo(Component, isEqual);
