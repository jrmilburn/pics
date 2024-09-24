import styles from './ProfilePage.module.css';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import Post from '../components/Post/Post';
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {
  const { currentUser } = useContext(AuthContext); // Ensure currentUser is set correctly
  const { id } = useParams(); // Get the user ID or username from the URL
  const [user, setUser] = useState(null); // Initialize user as null (not loaded yet)
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any error state

  useEffect(() => {
    if (!currentUser || !currentUser.token) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    // Fetch the user data from the backend
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`, // Pass the valid token in the headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // Set the user data from the API response
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setError(error.message); // Set the error state
        setLoading(false); // Stop loading even in case of error
      });
  }, [id, currentUser]); // Re-run when user ID or currentUser changes

  // Display loading state while fetching data
  if (loading) {
    return <div>Loading profile...</div>;
  }

  // Display any errors that occurred during the fetch
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle case when no user data is returned
  if (!user) {
    return <div>User not found</div>;
  }

  // Display the user's profile and posts once the data is available
  return (
    <div className={styles['profile']}>
      <ProfileHeader user={user} currentUser={currentUser} />
      {user.posts && user.posts.length > 0 ? (
        user.posts.map((post, index) => (
          <Post
            key={index}
            content={post.caption}
            image={post.image}
            author={user.username}
            createdAt={post.createdAt}
            postLikes={post.likes}
            comments={post.comments}
            currentUser={currentUser}
            postId={post.id}
          />
        ))
      ) : (
        <p>No posts to show</p>
      )}
    </div>
  );
}