import { memo } from 'react';
import isEqual from 'react-fast-compare';

const Component = () => {
  return <div />;
};
export const PartnerCompany = memo(Component, isEqual);
