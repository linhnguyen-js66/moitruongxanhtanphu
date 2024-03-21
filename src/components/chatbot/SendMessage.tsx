import { yupResolver } from '@hookform/resolvers/yup';
import type { FormProps } from 'antd';
import { Button } from 'antd';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { memo, useCallback, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { generateCustomerID } from '@/utils/other';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/storage';

import { AppTextFieldControl } from '../text-field';

type FieldType = {
  enterMessage?: string;
};

const Component = (props) => {
  const { scroll } = props;
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const inputSend = yup.object().shape({
    enterMessage: yup.string().trim().required(t('validate:message_error')),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(inputSend),
    defaultValues: {
      enterMessage: '',
    },
  });
  const message = watch('enterMessage');

  const saveCustomer = useCallback(() => {
    const storage = loadFromLocalStorage('CUSTOMER');
    if (!storage?.customerID) {
      const idCus = generateCustomerID();
      saveToLocalStorage('CUSTOMER', { customerID: idCus });
      setId(idCus);
    } else {
      setId(storage?.customerID);
    }
  }, []);
  useEffect(() => {
    saveCustomer();
  }, [saveCustomer]);

  const sendMessage: FormProps<FieldType>['onFinish'] = useCallback(async () => {
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: `Khach hang ${id}`,
      createdAt: serverTimestamp(),
      id,
    }).finally(() => {
      setValue('enterMessage', '');
    });
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  }, [id, message, scroll, setValue]);

  return (
    <form className="send-message" onSubmit={handleSubmit(sendMessage)}>
      <AppTextFieldControl
        control={control}
        name="enterMessage"
        placeholder={t('text:enter_message')}
        wrapperClassName="mb-20"
      />
      <Button type="default" htmlType="submit" disabled={!isValid}>
        Submit
      </Button>
      {/* <Form.Item
        label="Enter Message"
        name="username"
        // rules={[{ required: true, message: 'Please input text!' }]}
      >
        <Input
          id="messageInput"
          type="text"
          className="form-input__input"
          placeholder="type message..."
          {...register('enterMessage')}
          value={message} // Đảm bảo giá trị được cập nhật theo nhập liệu
          onChange={(e) => setValue('enterMessage', e.target.value)}
        />
        <TextBase t18n={errors?.enterMessage?.message} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
       
      </Form.Item> */}
    </form>
  );
};
export const SendMessage = memo(Component, isEqual);
