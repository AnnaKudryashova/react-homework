import LogoIcon from '../../assets/icons/logo.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';

import LinkColumn from '../linkColumn/LinkColumn';
import SocialLink from '../socialLink/SocialLink';
import { footerLinks, socialLinks } from '../../data/navData';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

const socialLinks = [
    { icon: instagramIcon, alt: 'Instagram', url: 'https://instagram.com/' },
    { icon: twitterIcon, alt: 'Twitter', url: 'https://twitter.com/' },
    { icon: youtubeIcon, alt: 'YouTube', url: 'https://youtube.com/' },
];

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className={`${styles.container} footer-bg`}>
            <div className={styles.content}>
                <div className={styles.mainContent}>
                    <div className={styles.brandSection}>
                        <img
                            src={LogoIcon}
                            alt="Company Logo"
                            className={styles.brandLogo}
                        />
                        <p className={styles.description}>
                            <span>{t('footer.descriptionLine1')}</span>
                            <span>{t('footer.descriptionLine2')}</span>
                        </p>
                    </div>
                    <nav className={styles.navigation}>
                        {footerLinks.map((section) => (
                            <LinkColumn
                                key={section.title}
                                title={t(section.title)}
                                links={section.links}
                            />
                        ))}
                    </nav>
                </div>
                <div className={styles.secondaryContent}>
                    <div className={styles.credits}>
                        <span>{t('footer.builtBy')}</span>
                        <a className={styles.link}>Flowbase</a>
                        <span>· {t('footer.poweredBy')}</span>
                        <a className={styles.link}>Webflow</a>
                    </div>
                    <div className={styles.socials}>
                        {socialLinks.map((social) => (
                            <SocialLink
                                key={social.alt}
                                url={social.url}
                                icon={social.icon}
                                alt={social.alt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
