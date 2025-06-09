import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-success">{post.author}</h5>
        <p className="card-text">{post.content}</p>
        <p className="card-text">
          <small className="text-muted">Posté le : {post.date}</small>
        </p>
      </div>
    </div>
  );
};

export default Post;