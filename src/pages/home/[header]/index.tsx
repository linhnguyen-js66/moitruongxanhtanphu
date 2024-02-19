import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { IconSvgLocal, TextBase } from '@/components';

const Component = () => {
  const { t } = useTranslation();
  const renderMobile = useCallback(() => {
    return (
      <div className="absolute top-12 flex hidden w-full justify-center px-32 text-center tablet:hidden mobile:block">
        <p className="body-text-32-medium">
          {t('text:slogan_home')}
          <span className="rounded-[36px] bg-primary-200 px-16 py-[2px]">{t('text:fight')}</span>
          {t('text:for')} {t('text:environment')}
        </p>
      </div>
    );
  }, [t]);
  return (
    <div className="relative flex flex-1 items-center justify-between">
      <IconSvgLocal name="IC_HOME_LEFT" height={300} />
      <div className="flex flex-col items-center justify-center text-center mobile:hidden">
        <div className="flex flex-wrap  justify-center text-center">
          <span>
            <TextBase
              preset="body-text-64-medium"
              presetTable="body-text-48-medium"
              presetMobile="body-text-32-medium"
            >
              {t('text:slogan_home')}
            </TextBase>
          </span>
          <span className="inline-flex items-center rounded-[36px] bg-primary-100 px-16 py-4">
            <TextBase
              presetTable="body-text-48-medium"
              preset="body-text-64-medium"
              presetMobile="body-text-32-medium"
            >
              {t('text:fight')}
            </TextBase>
          </span>
          <span className="inline-flex">
            <TextBase
              presetTable="body-text-48-medium"
              preset="body-text-64-medium"
              presetMobile="body-text-32-medium"
            >
              {t('text:for')}
            </TextBase>
          </span>
          <span className="hidden tablet:block">
            <TextBase
              presetTable="body-text-48-medium"
              preset="body-text-64-medium"
              presetMobile="body-text-32-medium"
            >
              {t('text:environment')}
            </TextBase>
          </span>
        </div>
        <div className="tablet:hidden">
          <TextBase
            presetTable="body-text-48-medium"
            preset="body-text-64-medium"
            presetMobile="body-text-32-medium"
          >
            {t('text:environment')}
          </TextBase>
        </div>
      </div>
      <IconSvgLocal name="IC_HOME_RIGHT" height={300} />
      {renderMobile()}
    </div>
  );
};
export const HeaderHome = memo(Component, isEqual);
