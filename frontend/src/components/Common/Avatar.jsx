import styles from './Avatar.module.css';

export default function Avatar({ username }) {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff`}
      alt={`${username}'s avatar`}
      className={styles['avatar']}
    />
  );
}