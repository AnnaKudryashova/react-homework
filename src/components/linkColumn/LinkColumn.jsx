import styles from './LinkColumn.module.css';

const LinkColumn = ({ title, links }) => {
    return (
        <div className={styles.linkColumn}>
            <h4 className={styles.linkTitle}>{title}</h4>
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.url}
                    className={styles.link}
                    target="_blank"
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
};

export default LinkColumn;
