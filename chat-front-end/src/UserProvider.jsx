import React, { createContext, useState } from 'react';

export const UsernameContext = createContext({
  globalUserName: '',
  setGlobalUser: () => {
    return;
  }
});

export const UserProvider = ({ children }) => {
  const [globalUserName, setGlobalUser] = useState('');
  return (
    <UsernameContext.Provider value={{ globalUserName, setGlobalUser }}>
      {children}
    </UsernameContext.Provider>
  );
};
