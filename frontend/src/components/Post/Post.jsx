import React from 'react';
import styles from './Post.module.css';
import { useState } from 'react';

import Comment from '../Comment/Comment';

const Post = ({ content, author, createdAt, postLikes, comments, currentUser, postId }) => {

  console.log(currentUser);

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  }

  const handleCommentSubmit = async () => {

    const response = await fetch('http://localhost:3000/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({
        text: newComment,
        postId: postId
      })
    })

  }

  return (
    <div className={styles["post"]}>
      <div className={styles["post-header"]}>
        <div className={styles["author-avatar"]}>
          <img
            src={`https://ui-avatars.com/api/?name=${author}&background=0D8ABC&color=fff`}
            alt={`${author}'s avatar`}
          />
        </div>
        <div className={styles["author-info"]}>
          <span className={styles["author-name"]}>{author}</span>
          <span className={styles["post-date"]}>{new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className={styles["post-content"]}>
        <p>{content}</p>
      </div>
      <div className={styles["likes"]}>
        <span>{postLikes.length} likes</span>
      </div>
      <div className={styles["comments"]}>
        <button onClick={() => setShowComments(!showComments)} className={styles['comments-btn']}>
          {showComments ? 'Hide comments' : `Show all ${comments.length} comments` }
        </button>
        {showComments && (
          <div>
            {comments.map((comment, index) => (
              <Comment key={index} author={comment.author.username} content={comment.text} commentLikes={comment.likes} />
            ))}
          </div>
        )}
      </div>
      <div className={styles["comment-input-container"]}>
        <input 
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder='Add a comment'
            className={styles["comment-input"]}
        />
        <button onClick={handleCommentSubmit} className={styles["comment-submit"]}>Comment</button>
      </div>
    </div>
  );
};

export default Post;
