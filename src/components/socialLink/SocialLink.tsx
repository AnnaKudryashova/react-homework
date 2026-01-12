import styles from './SocialLink.module.css';

interface SocialLinkProps {
    url?: string;
    icon: string;
    alt: string;
}

const SocialLink = ({ url, icon, alt }: SocialLinkProps) => {
    return (
        <a
            href={url ?? '#'}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img src={icon} alt={alt} className={styles.iconImage} />
        </a>
    );
};

export default SocialLink;
