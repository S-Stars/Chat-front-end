import React from 'react';
import {HashRouter, Route} from 'react-router-dom'
import {Login} from './Login'

function App() {
  return (
      <HashRouter>
        <Route exact path="/" component={Login} />
        
      </HashRouter>
  );
}

export default App;
