import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { IconSvgTypes } from '@/assets/svg';

export const useHome = () => {
  const { t } = useTranslation();
  const [selectItem, setSelectItem] = useState<any>({});
  const dataIntro = useMemo(() => {
    return [
      {
        title: t('text:vision'),
        des: t('text:des_vision'),
        ic: 'IC_VISION' as IconSvgTypes,
        id: 1,
      },
      {
        title: t('text:mission'),
        des: t('text:des_mission'),
        ic: 'IC_MISSION' as IconSvgTypes,
        id: 2,
      },
      {
        title: t('text:value'),
        des: t('text:des_value'),
        ic: 'IC_CORE' as IconSvgTypes,
        id: 3,
      },
    ];
  }, [t]);
  const handleScroll = useCallback((event: any) => {
    const container = event.target;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    setSelectItem(dataIntro?.[0]);
  }, []);
  return { dataIntro, selectItem, handleScroll };
};
