import { useEffect } from 'react';

const ZaloChatWidget = () => {
  useEffect(() => {
    // Function to load the Zalo SDK script
    const loadZaloSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://sp.zalo.me/plugins/sdk.js';
      script.async = true;
      document.body.appendChild(script);
    };

    // Check if the Zalo SDK script is already injected, if not, inject it
    if (!document.querySelector('script[src="https://sp.zalo.me/plugins/sdk.js"]')) {
      loadZaloSDK();
    }

    // Create the Zalo chat widget div and set its attributes
    const zaloChatWidgetDiv = document.createElement('div');
    zaloChatWidgetDiv.className = 'zalo-chat-widget';
    zaloChatWidgetDiv.setAttribute('data-oaid', '1737568307835058842');
    zaloChatWidgetDiv.setAttribute(
      'data-welcome-message',
      'Môi trường xanh Tân Phú, rất vui khi được hỗ trợ bạn!'
    );
    zaloChatWidgetDiv.setAttribute('data-autopopup', '0');
    zaloChatWidgetDiv.setAttribute('data-width', '');
    zaloChatWidgetDiv.setAttribute('data-height', '');

    // Append the Zalo chat widget div to the body
    document.body.appendChild(zaloChatWidgetDiv);

    return () => {
      // Cleanup function to remove the Zalo chat widget div and script when the component is unmounted
      document.body.removeChild(zaloChatWidgetDiv);
      // const zaloScript = document.querySelector('script[src="https://sp.zalo.me/plugins/sdk.js"]');
      // if (zaloScript) {
      //   document.body.removeChild(zaloScript);
      // }
    };
  }, []);

  return null;
};

export default ZaloChatWidget;
