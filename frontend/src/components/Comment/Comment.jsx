import styles from "./Comment.module.css";

export default function Comment({ author, content, commentLikes }) {
  return (
    <div className={styles["comment"]}>
      <div className={styles["comment-author"]}>
        <img
          src={`https://ui-avatars.com/api/?name=${author}&background=0D8ABC&color=fff`}
          alt={`${author}'s avatar`}
        />
      </div>
      <div className={styles["comment-content"]}>
        <p><strong><span>{author}</span></strong>  {content}</p>
        <div className={styles["comment-likes"]}>
            <span>{commentLikes.length} likes</span>
        </div>
      </div>

    </div>
  );
}