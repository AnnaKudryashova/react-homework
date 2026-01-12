import { ChangeEventHandler } from 'react';
import styles from './AuthInput.module.css';

interface AuthInputProps {
    label: string;
    id: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
}

const AuthInput = ({
    label,
    id,
    type,
    placeholder,
    value,
    onChange,
    required,
}: AuthInputProps) => (
    <div className={styles.row}>
        <label className={styles.label} htmlFor={id}>
            {label}
        </label>
        <input
            id={id}
            type={type}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default AuthInput;
