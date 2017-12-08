import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { likePost } from '../store/actions/postActions';

const Post = (props) => {
  const likePost = async () => {
    try {
      await props.actions.likePost(props.id);
    } catch (err) {
      alert('Couldn\'t like post');
      console.log(err);
    }
  };

  return (
    <div className="Post">
      <div className="row">
        <div className="col-3 my-auto">
          <img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Header" alt="" className="rounded float-left img-fluid"/>
        </div>
        <div className="col my-auto">
          <div className="text-left col-12">{props.text}</div>
          <div className="col-12 text-right">
            <Link to={`/users/account/${props.username}`}>
              @{props.username}
            </Link>
            <span className="fake-link" onClick={likePost}>Like post</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({likePost}, dispatch)
});

export default connect(null, mapDispatchToProps)(Post);
