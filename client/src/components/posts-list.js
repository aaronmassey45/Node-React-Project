import React, {Component} from 'react';
import axios from 'axios';

import Post from './post';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    let url;
    switch (this.props.type) {
      case 'home':
        url = '/posts';
        break;
      case 'user':
        url = `/posts/user/${this.props.id}`;
        break;
      default:
        throw new Error('Invalid prop type on PostList component');
    }

    try {
      let res = await axios.get(url);
      let users = await axios.get('/userlist');
      let posts = res.data.reverse().map(post => {
        let profile = users.data.find(x => x._id === post._creator);
        return (
          <div key={post._id} className="list-group-item">
            <Post post={post} username={profile.username} id={post._id} showDelete={this.props.showDelete}/>
          </div>
        );
      });
      this.setState({ posts });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="list-group list-group-flush">
        {this.state.posts}
      </div>
    );
  }
}
