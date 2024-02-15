import { t } from 'i18next';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { TextBase, TextStroke } from '@/components';

const Component = () => {
  return (
    <div>
      <div className="relative bg-primary-100">
        {/* <div className="absolute left-48 top-1/2 mobile:left-12"> */}
        <TextBase
          preset="body-text-18-bold"
          presetMobile="body-text-14-bold"
          presetTable="body-text-16-bold"
          t18n="Về chúng tôi"
          className="text-primary-700"
        />
        {/* </div> */}
        <div>
          <TextStroke
            text={t('text:recycle').toUpperCase()}
            className="h-[100px] tablet:h-[84px] mobile:h-[62px]"
          />
        </div>
      </div>
    </div>
  );
};
export const Intro = memo(Component, isEqual);
