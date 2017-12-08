import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { likePost } from '../store/actions/postActions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false
    };
  }

  likePost = async () => {
    try {
      await this.props.actions.likePost(this.props.id);
      this.setState({ liked: true });
    } catch (err) {
      alert('Couldn\'t like post');
      console.log(err);
    }
  };

  render () {
    let heart = !this.state.liked ? '-o' : ' text-danger';
    const { text, username } = this.props;
    return (
      <div className="Post">
        <div className="row">
          <div className="col-3 my-auto">
            <img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Header" alt="" className="rounded float-left img-fluid"/>
          </div>
          <div className="col my-auto">
            <div className="text-left col-12">{text}</div>
            <div className="col-12 text-right">
              <Link to={`/users/account/${username}`}>
                @{username}
              </Link>
              <p>
                <i className={`fa fa-heart${heart} fa-lg fake-link`} onClick={this.likePost}></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({likePost}, dispatch)
});

export default connect(null, mapDispatchToProps)(Post);
