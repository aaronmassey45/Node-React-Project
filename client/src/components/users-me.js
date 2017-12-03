import React, { Component } from 'react';
import axios from 'axios';

export default class MyAccount extends Component {
  state = {
    chowt: '',
    username: null
  }

  async componentDidMount() {
    const token = localStorage.getItem('x-auth');
    let res = await axios.get('/users/me', { headers: { 'x-auth': token } });
    let user = res.data;
    this.setState({ username: user.username });
  }

  handleChange = e => {
    this.setState({ chowt: e.target.value });
  }

  render() {
    let { username, chowt } = this.state;
    if (!username) return <div>Unauthorized user</div>;

    return (
      <div className="MyAccount mt-3">
        <div className="row p-3">
          <div className="col-xs-12 col-sm-4">
            <div className="card">
              <img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Header" alt="header" className="card-img-top"/>
              <div className="card-body">
                @<span>{username}</span>
                <p>This is my biiiiiioooooo. Dueces</p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="card">
              <div className="card-body">
                <form className="form-row">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder='Chowt it out!'
                      className='form-control'
                      onChange={this.handleChange}
                      value={chowt}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type='submit'>Send</button>
                    </span>
                  </div>
                </form>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">My second post</li>
                <li className="list-group-item">My first post</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
