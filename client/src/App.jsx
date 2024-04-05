import { Component } from 'react';
import Login from './components/login';
import Profile from './components/profile';
import {BrowserRouter,Route} from 'react-router-dom';

const App =()=> {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path='/login' Component={Login} />
          <Route exact path='/profile' Component={Profile} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
