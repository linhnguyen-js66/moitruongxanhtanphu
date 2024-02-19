import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { HeaderHome } from './[header]';
import { BodyHome } from './[header]/[body]';
import { FooterHome } from './[header]/[body]/[footer]';

const Component = () => {
  return (
    <div className="bg-common-1000">
      <HeaderHome />
      <BodyHome />
      <FooterHome />
    </div>
  );
};
export const HomePage = memo(Component, isEqual);
