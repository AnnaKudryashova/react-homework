import styles from './AuthInput.module.css';

const AuthInput = ({
    label,
    id,
    type,
    placeholder,
    value,
    onChange,
    required,
}) => (
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
