import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';
import AuthInput from '../components/input/AuthInput';
import menuBg from '../assets/images/menu-bg.svg';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';

const errorMap = {
    'auth/invalid-credential':
        'Invalid email or password. Please check your credentials or register new account.',
    'auth/user-not-found':
        'User with this email does not exist. Please register first.',
    'auth/wrong-password': 'Wrong password. Please try again.',
    'auth/email-already-in-use':
        'This email is already registered. Please login instead.',
    'auth/weak-password':
        'Password is too weak. Please use at least 6 characters.',
    'auth/invalid-email': 'Invalid email format.',
};

const getErrorMessage = (errorCode) => {
    return errorMap[errorCode] || 'An error occurred. Please try again.';
};

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

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setError('');
        navigate('/');
    };

    return (
        <div
            className={styles.loginPage}
            style={{ backgroundImage: `url("${menuBg}")` }}
        >
            <h1 className={styles.title}>
                {isRegistering ? 'Sign up' : 'Log in'}
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <AuthInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <AuthInput
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

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
