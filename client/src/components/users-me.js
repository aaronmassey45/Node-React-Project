import React, { Component } from 'react';
import axios from 'axios';

export default class MyAccount extends Component {
  state = {
    username: ''
  }

  async componentDidMount() {
    const token = localStorage.getItem('x-auth');
    let res = await axios.get('/users/me', { headers: { 'x-auth': token } });
    let user = res.data;
    this.setState({ username: user.username })
  }

  render() {
    return (
      <div className="MyAccount container">
        <p>{this.state.username}</p>
      </div>
    );
  }
}
