import React from 'react';
import styles from './Post.module.css';

const Post = ({ content, author, createdAt }) => {
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
    </div>
  );
};

export default Post;
