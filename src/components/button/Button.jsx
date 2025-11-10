import styles from './Button.module.css';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    className,
    disabled = false,
}) => (
    <button
        type="button"
        className={`${styles.button} ${styles[variant]} ${className || ''}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
