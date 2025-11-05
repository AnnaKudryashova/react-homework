import styles from './Button.module.css';

const Button = ({
    children,
    isActive = true,
    onClick,
    className,
    disabled = false,
}) => (
    <button
        type="button"
        className={`${styles.button} ${!isActive ? styles.inactive : ''} ${
            className || ''
        }`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
