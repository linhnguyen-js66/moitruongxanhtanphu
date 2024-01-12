import { createRef, forwardRef, useImperativeHandle, useState } from 'react';

import { IconSvgLocal } from '../icon-vec-local';

const LoadingLayout = forwardRef((_, ref: any) => {
  const [visible, setVisible] = useState(false);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );

  if (!visible) {
    return <></>;
  }

  // return ReactDOM.createPortal(
  //   <div className='loading_custom'>
  //   <IconSvgLocal name="IC_LOADING" className='w-[60px] h-[60px]'/>
  // </div>,
  // //@ts-ignore
  //   document.querySelector('body'),
  // )
  return (
    <div className="loading_custom">
      <IconSvgLocal name="IC_LOADING" className="h-[60px] w-[60px]" />
    </div>
  );
});

// export default LoadingLayout;
export const LoadingProgressRef = createRef<LoadingProgressRef>();
export const LoadingProgress = () => <LoadingLayout ref={LoadingProgressRef} />;

export const showLoading = () => {
  LoadingProgressRef.current?.show();
};

export const hideLoading = () => {
  LoadingProgressRef.current?.hide();
};
export interface LoadingProgressRef {
  show(): void;
  hide(): void;
}
