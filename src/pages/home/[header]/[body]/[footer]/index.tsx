import { memo } from 'react';
import isEqual from 'react-fast-compare';

const Component = () => {
  return (
    <div className="card-img">{/* <span className="circle" /> */}</div>
    // <div className="card">
    //   <Image
    //     width={340}
    //     height={500}
    //     src="https://images.unsplash.com/photo-1525923838299-2312b60f6d69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlYWZ8ZW58MHx8MHx8fDA%3D"
    //     alt="image"
    //   />
    //   <div className="shape" />
    //   <div className="zoom flex items-center justify-center">
    //     <IconSvgLocal name="IC_SETTING" height={36} />
    //   </div>
    // </div>
  );
};
export const FooterHome = memo(Component, isEqual);
