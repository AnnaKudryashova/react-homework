import { useTranslation } from 'react-i18next';
import styles from './LinkColumn.module.css';
import type { FooterLink } from '../../types/types';

interface LinkColumnProps {
    title: string;
    links: FooterLink[];
}

const LinkColumn = ({ title, links }: LinkColumnProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.linkColumn}>
            <h4 className={styles.linkTitle}>{title}</h4>
            {links.map(({ label, url }) =>
                url ? (
                    <a key={label} href={url} className={styles.link}>
                        {t(label)}
                    </a>
                ) : (
                    <span key={label} className={styles.link}>
                        {t(label)}
                    </span>
                ),
            )}
        </div>
    );
};

export default LinkColumn;
