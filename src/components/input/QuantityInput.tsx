import { ChangeEventHandler } from 'react';
import styles from './QuantityInput.module.css';

interface QuantityInputProps {
    value: number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

const QuantityInput = ({ value, onChange, className }: QuantityInputProps) => {
    return (
        <div className={className || styles.quantityWrapper}>
            <input
                type="number"
                min={1}
                value={value}
                onChange={onChange}
                className={styles.quantityInput}
            />
        </div>
    );
};

export default QuantityInput;
