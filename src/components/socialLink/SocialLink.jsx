import styles from './SocialLink.module.css';

const SocialLink = ({ url, icon, alt }) => {
    return (
        <a href={url} className={styles.socialLink} target="_blank">
            <img src={icon} alt={alt} className={styles.iconImage} />
        </a>
    );
};

export default SocialLink;
