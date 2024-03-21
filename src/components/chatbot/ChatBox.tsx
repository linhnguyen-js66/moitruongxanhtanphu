import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { filter } from 'lodash';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

import { loadFromLocalStorage } from '@/utils/storage';

import { Message } from './Message';
import { SendMessage } from './SendMessage';

const Component = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const idCustomer = useMemo(() => {
    const cus = loadFromLocalStorage('CUSTOMER');
    return cus?.customerID;
  }, []);
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: any = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id, customID: doc.data().id });
      });
      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      const findDataForIDCustomer = filter(sortedMessages, (item) => item?.customID == idCustomer);

      setMessages(findDataForIDCustomer);
    });
    return () => unsubscribe;
  }, [idCustomer]);

  return (
    <div>
      <div className="messages-wrapper">
        {messages?.map((message) => <Message key={message.id} message={message} />)}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll} />
      <SendMessage scroll={scroll} />
    </div>
  );
};
export const ChatBox = memo(Component, isEqual);
