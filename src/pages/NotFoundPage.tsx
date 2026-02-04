import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.title}>404 Page not found</h1>
            <p className={styles.description}>
                The page you are looking for does not exist.
            </p>
            <Button onClick={handleGoHome} className={styles.button}>
                Go to Home
            </Button>
        </div>
    );
};

export default NotFoundPage;
