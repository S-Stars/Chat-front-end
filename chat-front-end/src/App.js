import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Login } from './Login';
import { ChatPage } from './Chat';
import { UserProvider } from './UserProvider';

function App() {
  return (
    // This is the root react node,this is where we store global data and host different
    // route components
    <UserProvider>
      <HashRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/chat" component={ChatPage} />
      </HashRouter>
    </UserProvider>
  );
}

export default App;
