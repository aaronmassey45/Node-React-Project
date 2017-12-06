import React, {Component} from 'react';
import axios from 'axios';

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
      let posts = res.data.reverse().map((post, i) => <li key={i} className="list-group-item">{post.text}</li>);
      this.setState({ posts });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.state.posts}
      </ul>
    );
  }
}
