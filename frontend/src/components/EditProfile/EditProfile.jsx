import styles from './EditProfile.module.css';
import { useState } from 'react';

export default function EditProfile({visible, onClose, currentUser}) {

    const [bio, setBio] = useState(user.bio);
    const [image, setImage] = useState(user.image);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

    const handleImageChange = (e) => {

        const selectedImage = e.target.files[0];
        if (selectedImage) {
          setImage(selectedImage);
        }

    }

    const handleUpdateProfile = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('profilePicture', image);

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }

            const postData = await response.json();
            console.log('Post created successfully:', postData);
      
            onClose();
        } catch(error) {
            console.error('Error updating user: ', error);
        }    

    }
    return (

        <div className={styles["editprofile-modal-overlay"]} onClick={handleOverlayClick}>
        <div className={styles["editprofile-modal"]}>
          <h2>Edit Profile</h2>
          <textarea
            placeholder="About you..."
            className={styles['edit-bio']}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          {error && <p className={styles['error-message']}>{error}</p>}
          <button 
            onClick={handleUpdateProfile} 
          >
            Post
          </button>
        </div>
      </div>

    )

}