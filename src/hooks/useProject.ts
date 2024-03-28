import { Form, message } from 'antd';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { t } from 'i18next';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { StaticImageData } from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { get } from 'react-hook-form';

import WASTE_FACTORY from '@/assets/image/waste_factory.avif';
import { JSONFiles } from '@/assets/json';
import { loadFromLocalStorage } from '@/utils/storage';

import { useModal } from './useModal';

export enum TYPE_CONTENT {
  XU_LY_TC = 'XU_LY_TC',
  TUVAN = 'TUVAN',
  KINHDOANH = 'KINHDOANH',
}

export const useProject = (props: any) => {
  const [form] = Form.useForm();
  const { isActive } = props;
  const [loading, setLoading] = useState(false);
  const [purpose, setPurpose] = useState<any>([]);
  const countryData = JSONFiles.country;
  const { flagCountry } = JSONFiles;
  const [selectNation, setSelectNation] = useState<any>({});
  const { isModalOpen, showModal, handleCancel } = useModal();
  // const { currentLanguage } = useAppLanguage();
  const [content, setContent] = useState({
    title: '',
    content: '',
    content2: '',
    img: '' as StaticImageData | string,
    form: false,
  });
  const [configShow, setConfigShow] = useState({
    slidesToScroll: 3,
    slidesToShow: 3,
  });

  const onSelectContent = useCallback(
    (type: string) => {
      switch (type) {
        case TYPE_CONTENT.XU_LY_TC:
          setContent({
            title: t('text:waste_management'),
            content: t('text:content_waste'),
            content2: t('text:content_waste_v2'),
            img: WASTE_FACTORY,
            type,
          });
          break;
        case TYPE_CONTENT.TUVAN:
          setContent({
            title: `${t('text:support_env')} ${t('text:support_env_v2')}`,
            content: t('text:content_support'),
            content2: t('text:legal_1'),
            content3: t('text:legal_2'),
            form: true,
            type,
          });
          break;
        case TYPE_CONTENT.KINHDOANH:
          setContent({
            title: t('text:sale_env'),
            content: '',
            type,
          });
          break;
        default:
          setContent({
            title: '',
            content: '',
          });
          break;
      }
      showModal();
    },
    [showModal, t]
  );
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
    [selectNation]
  );

  // {country.name} (+{country.dialCode})
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

  useEffect(() => {
    setSelectNation(countryList?.[0]);
  }, [countryList]);

  const handleNation = useCallback((value: any) => {
    setSelectNation(value);
  }, []);
  const handlePhoneNumber = useCallback(
    (value: string) => {
      const fullPhoneNumber = `+${selectNation?.value}${value}`;
      const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
      if (phoneNumber?.isValid()) {
        message.success('');
      } else {
        message.error(t('validate:error_phone'));
      }
    },
    [selectNation?.value]
  );
  const getListPurpose = useCallback(async () => {
    const data = loadFromLocalStorage('language');

    const language = get(data, 'vi', false);
    const querySnapshot = await getDocs(collection(db, 'purpose'));
    const purposesArray = querySnapshot.docs.map((doc) => ({
      documentID: doc.id,
      ...doc.data(),
      value: language ? doc?.data().content?.vi : doc?.data().content?.en,
    }));
    setPurpose(purposesArray);
  }, []);
  useEffect(() => {
    getListPurpose();
  }, [getListPurpose]);

  return {
    isActive,
    isModalOpen,
    showModal,
    handleCancel,
    configShow,
    content,
    onSelectContent,
    onUpload,
    setConfigShow,
    countryList,
    handleNation,
    selectNation,
    handlePhoneNumber,
    loading,
    form,
  };
};
