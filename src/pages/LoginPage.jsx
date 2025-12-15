import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/slices/authSlice';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebase';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';
import {
    setEmail,
    setPassword,
    toggleIsRegistering,
    setError,
    clearForm,
} from '../redux/slices/loginSlice';

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

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { email, password, isRegistering, error } = useSelector(
        (state) => state.login
    );

    const handleSubmit = async (e) => {
        console.log('submit', { email, password, isRegistering });
        e.preventDefault();

        try {
            if (isRegistering) {
                const cred = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const cleanUser = {
                    uid: cred.user.uid,
                    email: cred.user.email,
                };
                dispatch(setUser(cleanUser));
            } else {
                const cred = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const cleanUser = {
                    uid: cred.user.uid,
                    email: cred.user.email,
                };
                dispatch(setUser(cleanUser));
            }
            dispatch(setError(''));
            navigate('/order', { replace: true });
        } catch (err) {
            console.error('Firebase error:', err.code, err.message);
            dispatch(setError(getErrorMessage(err.code)));
        }
    };

    const handleCancel = () => {
        dispatch(clearForm());
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
                        onChange={(e) => dispatch(setEmail(e.target.value))}
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
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.buttons}>
                    <Button type="submit" className={styles.submitButton}>
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
                        onClick={() => dispatch(toggleIsRegistering())}
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
