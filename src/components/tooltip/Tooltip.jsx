import styles from './tooltip.module.css';

const Tooltip = ({ text, children }) => {
    return (
        <span className={styles.tooltip}>
            {children}
            <span className={styles.tooltipText}>{text}</span>
        </span>
    );
};

export default Tooltip;
