import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, clearError } from '../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button from '../components/button/Button';
import AuthInput from '../components/input/AuthInput';
import styles from './LoginPage.module.css';

const errorMap: Record<string, string> = {
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

const getErrorMessage = (errorCode: string): string =>
    errorMap[errorCode] || 'An error occurred. Please try again.';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const { loading, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(clearError());

        const thunk = isRegistering ? registerUser : loginUser;
        const resultAction = await dispatch(thunk({ email, password }));

        if (thunk.fulfilled.match(resultAction)) {
            setEmail('');
            setPassword('');
            navigate('/order', { replace: true });
        }
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setIsRegistering(false);
        navigate('/');
    };

    return (
        <div className={`${styles.loginPage} menu-bg`}>
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
                {error && (
                    <p className={styles.error}>{getErrorMessage(error)}</p>
                )}
                <div className={styles.buttons}>
                    <Button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading
                            ? 'Loading...'
                            : isRegistering
                              ? 'Sign up'
                              : 'Log in'}
                    </Button>
                    <Button
                        type="button"
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
