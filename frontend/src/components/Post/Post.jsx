import React from 'react';
import styles from './Post.module.css';
import { useState } from 'react';
import Avatar from '../Common/Avatar';
import HeartBlack from '../../assets/heartblack.svg';
import HeartRed from '../../assets/heartred.svg';
import Comment from '../Comment/Comment';

const Post = ({ content, image, author, createdAt, postLikes, comments, currentUser, postId }) => {
  const [liked, setLiked] = useState(postLikes.some(like => like.userId === currentUser.user.id));
  const [likesCount, setLikesCount] = useState(postLikes.length); // Track the like count separately
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  }

  const handleCommentSubmit = async () => {
    const response = await fetch('https://pics-backend.onrender.com/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        text: newComment,
        postId: postId,
      }),
    });

    setNewComment('');
  };

  const handleLikePost = async () => {
    setLiked(true);
    setLikesCount(likesCount + 1); // Increment the like count

    const response = await fetch(`https://pics-backend.onrender.com/post/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const handleUnLikePost = async () => {
    setLiked(false);
    setLikesCount(likesCount - 1); // Decrement the like count

    const response = await fetch(`https://pics-backend.onrender.com/post/${postId}/like`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={styles["post"]}>
      <div className={styles["post-header"]}>
        <div className={styles["author-avatar"]}>
          <Avatar username={author} />
        </div>
        <div className={styles["author-info"]}>
          <span className={styles["author-name"]}>{author}</span>
          <span className={styles["post-date"]}>{new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className={styles["post-content"]}>
        {image && <img src={`https://pics-backend.onrender.com${image}`} alt="Post" className={styles['post-image']} />}
        <p>{content}</p>
      </div>
      <div className={styles["likes"]}>
        <span>{likesCount} likes</span>
        {liked ? (
          <button onClick={handleUnLikePost} className={styles['like-btn']}><img src={HeartRed} alt="Unlike" /></button>
        ) : (
          <button onClick={handleLikePost} className={styles['like-btn']}><img src={HeartBlack} alt="Like" /></button>
        )}
      </div>
      <div className={styles["comments"]}>
        <button onClick={() => setShowComments(!showComments)} className={styles['comments-btn']}>
          {showComments ? 'Hide comments' : `Show all ${comments.length} comments`}
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
            placeholder="Add a comment"
            className={styles["comment-input"]}
        />
        <button onClick={handleCommentSubmit} className={styles["comment-submit"]}>Comment</button>
      </div>
    </div>
  );
};

export default Post;
