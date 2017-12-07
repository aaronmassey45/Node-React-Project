import React from 'react';

const Post = (props) => {
  return (
    <div className="Post">
      <div className="row">
        <div className="col-3 my-auto">
          <img src="https://dummyimage.com/600x400/000/fff&text=Dummy+Header" alt="" className="rounded float-left img-fluid"/>
        </div>
        <div className="col my-auto">
          <div className="text-left col-12">{props.text}</div>
          <div className="col-12 text-right">@{props.username}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
