import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { sortBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { JSONFiles } from '@/assets/json';

export const useIntro = () => {
  const [services, setServices] = useState([]);
  const { serviceDefault } = JSONFiles;
  const { t } = useTranslation();
  const getListListService = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'waste_tech'));
    const result = [] as any;
    querySnapshot.docs.map((doc) => {
      const findItem = serviceDefault.find((el) => el?.id == doc?.data().id);

      if (findItem && doc?.data()?.status) {
        result.push({
          documentID: doc.id,
          ...doc.data(),
          service: t(findItem?.service),
          ic: findItem?.ic,
        });
      }
    });
    const sortData = sortBy(result, ['id']);
    setServices(sortData);
  }, [serviceDefault, t]);

  useEffect(() => {
    getListListService();
  }, [getListListService]);
  return { services };
};
