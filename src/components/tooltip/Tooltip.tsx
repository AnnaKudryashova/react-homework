import { ReactNode } from 'react';
import styles from './tooltip.module.css';

interface TooltipProps {
    text: string;
    children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
    return (
        <span className={styles.tooltip}>
            {children}
            <span className={styles.tooltipText}>{text}</span>
        </span>
    );
};

export default Tooltip;
