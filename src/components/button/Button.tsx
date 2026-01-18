import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

const Button = ({
    children,
    variant = 'primary',
    onClick,
    className,
    disabled = false,
    type = 'button',
    ...rest
}: ButtonProps) => (
    <button
        type={type}
        className={`${styles.button} ${styles[variant]} ${className || ''}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}
    >
        {children}
    </button>
);

export default Button;
