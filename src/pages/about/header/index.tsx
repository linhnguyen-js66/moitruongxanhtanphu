import Image from 'next/image';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { TextBase } from '@/components';

const Component = () => {
  return (
    <div className="bg-common-500 p-[64px] mobile:p-16">
      <div className="grid grid-flow-row grid-cols-2 gap-16 mobile:grid-cols-1">
        {/** 1 */}
        <div className="max-h-[500px] rounded-radius-xxxl bg-common-1000 px-24 py-48 shadow-down-m shadow-color-100 mobile:max-h-full">
          <TextBase
            t18n="text:about_comp"
            preset="body-text-24-semibold"
            presetMobile="body-text-18-semibold"
            className="text-primary-700"
          />
          <TextBase
            preset="body-text-48-bold"
            presetMobile="body-text-24-semibold"
            className="mt-32 text-common-0"
          >
            Our Dream is Global Learning Transformation
          </TextBase>
          <TextBase
            preset="body-text-16-light"
            className="mt-[64px] line-clamp-5 text-common-0 mobile:mt-48"
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas
            sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione
            voluptatem sequi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
            veritatis et quasi architecto beatae
          </TextBase>
        </div>
        <div className="flex max-h-[500px] flex-col gap-16 mobile:grid mobile:max-h-full mobile:grid-flow-col mobile:grid-cols-2">
          {/** 2 */}
          <div className="img-custom grow overflow-auto overflow-hidden rounded-radius-xxxl">
            <Image
              fill
              className="img-inner"
              src="https://images.unsplash.com/photo-1503149779833-1de50ebe5f8a?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Your Image"
            />
          </div>
          {/** 3 */}
          <div className="grid grid-flow-row grid-cols-2 gap-12 rounded-radius-xxxl bg-common-1000 px-24 py-48 shadow-down-m shadow-color-100 mobile:grid-cols-1">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="rounded-radius-l bg-color-100 p-16">
                <TextBase preset="body-text-24-semibold" presetMobile="body-text-18-semibold">
                  23+
                </TextBase>
                <TextBase preset="body-text-16-light" presetMobile="body-text-14-light">
                  Project Challenge
                </TextBase>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const HeaderAboutPage = memo(Component, isEqual);
