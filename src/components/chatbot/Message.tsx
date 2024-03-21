import { memo } from 'react';
import isEqual from 'react-fast-compare';

const Component = ({ message }) => {
  // ${message?.uid === user?.uid ? 'right' : ''}
  return (
    <div className="chat-bubble">
      <div className="chat-bubble__right">
        <p className="user-name">{message?.name}</p>
        <p className="user-message">{message?.text}</p>
      </div>
    </div>
  );
};
export const Message = memo(Component, isEqual);
