import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectLanguage } from '@/stores/globalSlice';

export const useNews = () => {
  const [listNews, setListNews] = useState<any>([]);
  const [highLight, setHighLight] = useState();
  const language = useSelector(selectLanguage);
  const [loading, setLoading] = useState(false);
  const getListNews = useCallback(async () => {
    setLoading(true);
    await getDocs(collection(db, 'news'))
      .then((querySnapshot) => {
        const list = querySnapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            documentID: doc.id,
            ...doc.data(),
            content: language == 'vi' ? doc?.data().content?.vi : doc?.data().content?.en,
            title: language == 'vi' ? doc?.data().title?.vi : doc?.data().title?.en,
            timeUp: moment.unix(doc.data()?.time?.seconds).format('DD/MM/YYYY'),
          };
        });
        const sortData = list.sort((a, b) => b.time.seconds - a.time.seconds);
        setHighLight(sortData?.[0]);
        setListNews(sortData.slice(1, list.length));
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [language]);
  // console.log(highLight, 'fff');
  useEffect(() => {
    getListNews();
  }, [getListNews]);
  return { loading, listNews, highLight };
};
