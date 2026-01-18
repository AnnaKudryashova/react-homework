import styles from './LinkColumn.module.css';
import type { FooterLink } from '../../types/types';

interface LinkColumnProps {
    title: string;
    links: FooterLink[];
}

const LinkColumn = ({ title, links }: LinkColumnProps) => {
    return (
        <div className={styles.linkColumn}>
            <h4 className={styles.linkTitle}>{title}</h4>
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.url ?? '#'}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
};

export default LinkColumn;
