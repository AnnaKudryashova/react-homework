import styles from './QuantityInput.module.css';

const QuantityInput = ({ value, onChange, className }) => {
    return (
        <div className={className || styles.quantityWrapper}>
            <input
                type="number"
                min="1"
                value={value}
                onChange={onChange}
                className={styles.quantityInput}
            />
        </div>
    );
};

export default QuantityInput;
