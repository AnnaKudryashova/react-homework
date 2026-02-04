import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
    <div className={styles.wrapper} aria-label="Loading">
        <div className={styles.spinner} />
    </div>
);

export default LoadingSpinner;
