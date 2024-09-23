import styles from './Create.module.css';
import { useState } from 'react';

export default function Create({ visible, onClose, currentUser }) {

    if(!visible) return null;

    const [caption, setCaption] = useState('');

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    const handleCreatePost = async () => {

        try {
            const response = await fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify({
                    caption: caption,
                }),
            });
        
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        
            onClose();

            const data = await response.json();
            console.log('Post created successfully:', data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
        

    }

    return (
        <div 
            className={styles["create-modal-overlay"]}
            onClick={handleOverlayClick} >

            <div className={styles["create-modal"]}>
                <h2>Create New Post</h2>
                <textarea 
                    placeholder="Write a post..." 
                    className={styles['create-caption']} 
                    onChange={(e) => setCaption(e.target.value)} 
                    value={caption}/>
                <button onClick={handleCreatePost}>Post</button>
            </div>

        </div>
    )
}