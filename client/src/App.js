import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MyAccount from './components/users-me';
import SignUp from './components/signup';
import TestRoute from './components/TestRoute';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/users/me' component={MyAccount} />
            <Route path='/signup' component={SignUp} />
            <Route path='/' component={TestRoute} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
