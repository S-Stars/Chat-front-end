import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import socketIOClient from 'socket.io-client';
import { UsernameContext } from './UserProvider';

export const socket = socketIOClient('http://localhost:5000');

//this is the file that handles the login state

export const Login = () => {
  // these are the local states that checks if the user has logged in or not

  const [username, changeUsername] = useState('');
  const [message, setMessage] = useState('');
  const { globalUserName, setGlobalUser } = useContext(UsernameContext);

  // this add the socket event listener across the app and see if the user has successfully logged in
  useEffect(() => {
    socket.on('userStatus', data => {
      if (!data) {
        return setMessage('user name has been taken');
      }
      setGlobalUser(username);
    });
    return () => {
      socket.off('userStatus');
    };
  });

  // this handles the submit event on the form
  const onSubmit = event => {
    event.preventDefault();
    if (username === '') {
      return setMessage('user name is empty please fill in an user name');
    }
    socket.emit('join', username);
  };

  // this handles the change of the login field
  const inputOnChange = event => {
    event.preventDefault();
    const inputName = event.target.value;
    changeUsername(inputName);
  };

  // render logic, if successful we go to the chat side
  return (
    <>
      {globalUserName.length !== 0 ? (
        <Redirect to="/chat" />
      ) : (
        <div>
          <h1>My Chat App</h1>
          <label>Enter an username</label>
          <input type="text" name="username" onChange={inputOnChange} />
          <button onClick={onSubmit}>Submit Username</button>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};
