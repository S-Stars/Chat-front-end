import React, { useEffect, useState, useContext } from 'react';
import { socket } from './Login';
import { UsernameContext } from './UserProvider';
import { Redirect } from 'react-router-dom';

const Chat = ({ globalUserName }) => {
  const [chatList, setChatList] = useState([]);
  const [messageField, setMessageField] = useState('');
  const [fetchStatus, setFetch] = useState(false);

  useEffect(() => {
    socket.emit('grabChat', true);
  }, [fetchStatus]);

  useEffect(() => {
    socket.on('chat', chatList => {
      setChatList(chatList);
      setFetch(true);
    });
    return () => {
      socket.off('chat');
    };
  }, [chatList, globalUserName]);

  const handleInputChange = event => {
    setMessageField(event.target.value);
  };

  const handleOnClick = event => {
    event.preventDefault();
    if (messageField.length === 0) {
      return;
    }
    socket.emit('message', `${globalUserName}: ${messageField}`);
  };

  return globalUserName.length === 0 ? (
    <Redirect to="/" />
  ) : (
    <>
      <ul>
        {chatList.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input type="text" name="chat" onChange={handleInputChange} />
      <button onClick={handleOnClick}>Submit Message</button>
    </>
  );
};

export const ChatPage = () => {
  const { globalUserName } = useContext(UsernameContext);
  window.onbeforeunload = () => {
    socket.emit('leave', globalUserName);
  };

  useEffect(() => {
    return () => {
      if (globalUserName.length !== 0) {
        socket.emit('leave', globalUserName);
      }
    };
  });
  return <Chat globalUserName={globalUserName}></Chat>;
};
