import styles from './ProfilePage.module.css';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import Post from '../components/Post/Post';
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {

    const { currentUser, logout } = useContext(AuthContext);
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            }
        })
        .then(response => response.json())
        .then(data => setUser(data))
        }, [id, currentUser.token])

    return (
        <div>
            <ProfileHeader user={user} currentUser={currentUser} />
            {user.posts && user.posts.map((post, index) => (
                <Post 
                    key={index} 
                    content={post.caption} 
                    author={user.username} 
                    createdAt={post.createdAt} 
                    postLikes={post.likes} 
                    comments={post.comments} 
                    currentUser={currentUser} 
                    postId={post.id} />
            ))}
        </div>
    )
}