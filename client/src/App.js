import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import requireAuth from './components/HOCs/requireAuth';
import EditUser from './components/editUser/EditUser';
import FloatingChowt from './components/ChowtModal';
import HomePage from './components/Homepage';
import Login from './components/Login';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/notfound';
import SignUp from './components/Signup';
import User from './components/User';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="mt-app">
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route
                path="/account/edit"
                exact
                component={requireAuth(EditUser)}
              />
              <Route path="/users/account/:username" exact component={User} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/" exact component={HomePage} />
              <Route path="*" component={NotFound} />
            </Switch>
            {this.props.appState.loggedIn ? <FloatingChowt /> : ''}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
});

export default connect(mapStateToProps)(App);
