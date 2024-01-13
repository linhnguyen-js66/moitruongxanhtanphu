import { Layout } from 'antd';
import Link from 'next/link';

import { IconSvgLocal } from '@/components';
import { TextBase } from '@/components/text';

const { Footer } = Layout;

const FooterApp = () => {
  const links = [
    { t18n: 'footer:frequently_asked_questions', onClick: () => {}, icon: 'ICON_QUESTION' },
    { t18n: 'footer:terms_conditions', onClick: () => {}, icon: 'ICON_NOTE' },
  ];
  return (
    <Footer className="footer_app" style={{ height: 'auto' }}>
      <div className="item-content flex">
        <TextBase t18n="footer:license" preset="body3" onClick={() => {}} />
      </div>
      <div className="item-content flex gap-24">
        {links.map(({ t18n, onClick, icon }: any, index) => (
          <Link href="/" key={index} className="flex items-center gap-8 mobile:gap-4">
            <IconSvgLocal name={icon} classNames="h-20 mobile:h-16" fill="rgb(var(--color-800))" />
            <TextBase
              key={t18n}
              t18n={t18n}
              className="sub-title2 text-color-800"
              presetMobile="caption2"
              onClick={onClick}
            />
          </Link>
        ))}
      </div>
    </Footer>
  );
};

export { FooterApp };
