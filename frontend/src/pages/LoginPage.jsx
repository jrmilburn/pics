import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import registerImg from '../assets/cameralense.webp';
import Logo from '../components/Common/Logo';


const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        navigate("/");
    }

    return (

        <div className={styles.container}>

        <div className={styles["image"]}>

            <img src={registerImg} alt="" />
            <div className={styles["image-logo"]}>
                <h2>Pics</h2>
                <Logo height={64} width={64} dark={false} />
            </div>

        </div>

        <div className={styles["right-side"]}>

        <form className={styles.loginform} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.logininput} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.logininput}
                />
                <button type="submit" className={styles.button}>Login</button>
                <p className={styles.registerLink}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>

        </div>
        </div>
    );
}

export default LoginPage;