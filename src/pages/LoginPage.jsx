import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('User registered');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('User logged in');
            }
            setError('');
            navigate('/order', { replace: true });
        } catch (error) {
            console.error('Firebase error:', error.code, error.message);
            setError(getErrorMessage(error.code));
            console.error(error);
        }
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-credential':
                return 'Invalid email or password. Please check your credentials or register new account.';
            case 'auth/user-not-found':
                return 'User with this email does not exist. Please register first.';
            case 'auth/wrong-password':
                return 'Wrong password. Please try again.';
            case 'auth/email-already-in-use':
                return 'This email is already registered. Please login instead.';
            case 'auth/weak-password':
                return 'Password is too weak. Please use at least 6 characters.';
            case 'auth/invalid-email':
                return 'Invalid email format.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setError('');
        navigate('/');
    };

    return (
        <div className={styles.loginPage}>
            <h1 className={styles.title}>
                {isRegistering ? 'Sign up' : 'Log in'}
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.buttons}>
                    <Button type="submit" className={styles.submitButton}>
                        {isRegistering ? 'Sign up' : 'Log in'}
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="secondary"
                        className={styles.cancelButton}
                    >
                        Cancel
                    </Button>
                </div>

                <p className={styles.switchText}>
                    {isRegistering
                        ? 'Already have an account? '
                        : "Don't have an account? "}
                    <Button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className={styles.switchLink}
                    >
                        {isRegistering ? 'Sign in' : 'Sign up'}
                    </Button>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
