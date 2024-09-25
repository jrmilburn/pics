import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import registerImg from '../assets/cameralense.webp';
import Logo from '../components/Common/Logo';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add registration logic here
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const response = await fetch('https://pics-backend.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, firstName, lastName, username, password }),
        });
        
        if(response.ok) {
            navigate('/login');
        }
        else {
            setError('Unable to register');
        }

        
    };

    return (
        <div className={styles.container}>

            <div className={styles["image"]}>

                <img src={registerImg} alt="" />
                <div className={styles["image-logo"]}>
                    <h2>Pics</h2>
                    <Logo height={64} width={64} dark={false}/>
                </div>

            </div>

            <div className={styles["right-side"]}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Register</h1>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles["fields"]}>

                <div className={styles["left-form"]}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        tabIndex={1}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.input}
                        tabIndex={3}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    tabIndex={5}
                    />
                </div>

                <div className={styles["right-form"]}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        tabIndex={2}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.input}
                        tabIndex={4}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                        tabIndex={6}
                    />
                </div>

                </div>
                
                <button type="submit" className={styles.button}>Register</button>
                <p className={styles.loginLink}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>

            </div>
        </div>

        
    );
}