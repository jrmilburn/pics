import styles from "./Comment.module.css";
import Avatar from "../Common/Avatar";

export default function Comment({ author, content, commentLikes }) {
  return (
    <div className={styles["comment"]}>
      <div className={styles["comment-author"]}>
        <Avatar username={author}/>
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