import React, { Component } from 'react';
import axios from 'axios';

import PostList from './posts-list';

export default class MyAccount extends Component {
  state = {
    chowt: '',
    username: '',
    _id: '',
    key: 0
  }

  async componentDidMount() {
    const token = localStorage.getItem('x-auth');
    let res = await axios.get('/users/me', { headers: { 'x-auth': token } });
    let user = res.data;
    this.setState({ username: user.username, _id: user._id });
  }

  newPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('x-auth');
      await axios.post('/chowt', { text: this.state.chowt }, { headers: { 'x-auth': token } });
      this.setState({ chowt: '', key: Math.random()*10000 })
    } catch (err) {
      alert('Post failed')
    }
  }

  handleChange = e => {
    this.setState({ chowt: e.target.value });
  }

  render() {
    let { username, chowt, _id, key } = this.state;
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
                <form className="form-row" onSubmit={this.newPost}>
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
              <PostList key={key} type='user' id={_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
