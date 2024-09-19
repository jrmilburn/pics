import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from './IndexPage.module.css';
import Post from '../components/Post/Post';

export default function IndexPage() {

    const { logout } = useContext(AuthContext);

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
                    <Post key={index} content={post.caption} author={post.author.username} createdAt={post.createdAt} />
                ))}

            </div>
        </div>
    );
}