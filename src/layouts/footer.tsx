import { Layout } from 'antd';
import Link from 'next/link';

import { IconSvgLocal } from '@/components';
import { TextBase } from '@/components/text';

const { Footer } = Layout;

const FooterApp = () => {
  const links = [
    {
      t18n: 'footer:frequently_asked_questions',
      onClick: () => alert('about_us'),
      icon: 'ICON_QUESTION',
    },
    {
      t18n: 'footer:terms_conditions',
      onClick: () => alert('tnc'),
      icon: 'ICON_NOTE',
    },
  ];
  return (
    <Footer
      // className="flex bg-primary-100 justify-between py-12 px-64 tablet:flex-colc"
      className="footer_app"
      style={{ height: 'auto' }}
    >
      <div className="item-content flex">
        <TextBase
          t18n="footer:license"
          preset="body3"
          onClick={() => alert('i_have_problems_using_it')}
        />
      </div>
      <div className="item-content flex gap-24">
        {links.map(({ t18n, onClick, icon }: any, index) => (
          <Link href="/" key={index} className="flex items-center gap-8">
            <IconSvgLocal
              name={icon}
              height={20}
              fill="rgb(var(--color-800))"
            />
            <TextBase
              key={t18n}
              t18n={t18n}
              className="sub-title2 text-color-800"
              onClick={onClick}
            />
          </Link>
        ))}
      </div>
    </Footer>
  );
};

export { FooterApp };
