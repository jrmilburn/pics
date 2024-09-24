import styles from './Create.module.css';
import { useState } from 'react';

export default function Create({ visible, onClose, currentUser }) {
  if (!visible) return null;

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null); // Ensure the image is never empty
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setError(''); // Clear any previous error when an image is selected
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Check if image is present
    if (!image) {
      setError('An image is required to create a post.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption); // Caption can be empty
    formData.append('image', image);      // Image is required

    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`, // No need for Content-Type with FormData
        },
        body: formData, // FormData handles multipart data
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const postData = await response.json();
      console.log('Post created successfully:', postData);

      onClose(); // Close modal on successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles["create-modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["create-modal"]}>
        <h2>Create New Post</h2>
        <textarea
          placeholder="Write a post..."
          className={styles['create-caption']}
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        {error && <p className={styles['error-message']}>{error}</p>}
        <button 
          onClick={handleCreatePost} 
          disabled={!image} // Disable button if no image is selected
        >
          Post
        </button>
      </div>
    </div>
  );
}