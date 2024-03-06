import { memo } from 'react';
import isEqual from 'react-fast-compare';

import { HeaderHome } from './[header]';
import { BodyHome } from './[header]/[body]';
import { FooterHome } from './[header]/[body]/[footer]';
import { ProjectHighLight } from './project';

const Component = () => {
  return (
    <div className="bg-common-1000">
      <HeaderHome />
      <BodyHome />
      <FooterHome />
      <ProjectHighLight />
    </div>
  );
};
export const HomePage = memo(Component, isEqual);
