import styles from './Avatar.module.css';
import { useEffect, useState } from 'react';

export default function Avatar({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/user/username/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error));
  }, [username]);

  // Check if user is null or undefined before accessing properties
  if (!user) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  return (
    <div>
      {user.profilePicture ? (
        <img
          src={`http://localhost:3000${user.profilePicture}`}
          alt={`${username}'s avatar`}
          className={styles['avatar']}
        />
      ) : (
        <img
          src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff`}
          alt={`${username}'s avatar`}
          className={styles['avatar']}
        />
      )}
    </div>
  );
}