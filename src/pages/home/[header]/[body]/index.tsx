import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { ButtonBase, IconSvgLocal, TextBase } from '@/components';

const Component = () => {
  return (
    <div className="flex flex-1 items-start justify-between px-32 mobile:flex-col mobile:items-center">
      <TextBase
        t18n="text:slogan_home_body"
        preset="body-text-24-light"
        presetMobile="body-text-16-light"
        className="item-animation w-1/3 mobile:mb-24 mobile:w-full mobile:text-center"
      />
      <ButtonBase
        name="learnMore"
        classNames="bg-primary-200 rounded-[36px] px-32 mobile:mb-24 item-animation"
        customContent={
          <div className="flex items-center">
            <TextBase
              t18n="text:learn_more"
              preset="body-text-24-light"
              presetMobile="body-text-16-light"
            />
            <IconSvgLocal name="IC_ARROW_ITALIC_RIGHT" classNames="h-32 mobile:h-24" />
          </div>
        }
      />
    </div>
  );
};
export const BodyHome = memo(Component, isEqual);
