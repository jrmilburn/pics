import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import io from 'socket.io-client';
import styles from './IndexPage.module.css';
import Post from '../components/Post/Post';

export default function IndexPage() {

    const { currentUser, logout } = useContext(AuthContext);
    const socketRef = useRef();

    const handleLogout = () => {
        logout();

    };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error:', error));
    }, []);

    console.log(posts); 

    return (
        <div>
            <div className={styles["posts"]}>

                {posts.map((post, index) => (
                    <Post key={index} content={post.caption} image={post.image} author={post.author.username} createdAt={post.createdAt} postLikes={post.likes} comments={post.comments} currentUser={currentUser} postId={post.id} />
                ))}

            </div>
        </div>
    );
}