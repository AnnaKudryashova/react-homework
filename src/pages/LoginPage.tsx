import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, clearError } from '../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button from '../components/button/Button';
import AuthInput from '../components/input/AuthInput';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import styles from './LoginPage.module.css';

const errorMap: Record<string, string> = {
    'auth/invalid-credential':
        'Invalid email or password. Please check your credentials or register new account.',
    'auth/user-not-found':
        'User with this email does not exist. Please register first.',
    'auth/email-already-in-use':
        'This email is already registered. Please login instead.',
    'auth/weak-password':
        'Password is too weak. Please use at least 6 characters.',
    'auth/invalid-email': 'Invalid email format.',
};

const getErrorMessage = (errorCode: string): string =>
    errorMap[errorCode] || errorCode || 'An error occurred. Please try again.';

const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (pwd: string) => pwd.length >= 6;

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const { loading, error } = useAppSelector((state) => state.auth);

    const isFormFilled = email.trim() !== '' && password.trim() !== '';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);
        dispatch(clearError());
        if (!isValidEmail(email)) {
            setFormError('Please enter a valid email.');
            return;
        }
        if (!isValidPassword(password)) {
            setFormError('Password must be at least 6 characters.');
            return;
        }

        const thunk = isRegistering ? registerUser : loginUser;
        const resultAction = await dispatch(thunk({ email, password }));

        if (thunk.fulfilled.match(resultAction)) {
            setEmail('');
            setPassword('');
            if (isRegistering) {
                navigate('/menu', { replace: true });
            } else {
                navigate('/order', { replace: true });
            }
        }
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setIsRegistering(false);
        setFormError(null);
        dispatch(clearError());
        navigate('/');
    };

    if (loading) {
        return (
            <div className={`${styles.loginPage} menu-bg`}>
                <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

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
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setFormError(null);
                    }}
                    required
                />
                <AuthInput
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setFormError(null);
                    }}
                    required
                />
                {formError && <p className={styles.error}>{formError}</p>}
                {error && (
                    <p className={styles.error}>{getErrorMessage(error)}</p>
                )}
                <div className={styles.buttons}>
                    <Button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading || !isFormFilled}
                    >
                        {isRegistering ? 'Sign up' : 'Log in'}
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
                        onClick={() => {
                            dispatch(clearError());
                            setFormError(null);
                            setIsRegistering(!isRegistering);
                        }}
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
