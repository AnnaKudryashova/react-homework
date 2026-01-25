import LogoIcon from '../../assets/icons/logo.svg';
import LinkColumn from '../linkColumn/LinkColumn';
import SocialLink from '../socialLink/SocialLink';
import { footerLinks, socialLinks } from '../../data/navData';
import styles from './Footer.module.css';

const Footer = () => {
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
                            <span>Takeaway & Delivery template </span>
                            <span>for small - medium businesses.</span>
                        </p>
                    </div>
                    <nav className={styles.navigation}>
                        {footerLinks.map((section) => (
                            <LinkColumn
                                key={section.title}
                                title={section.title}
                                links={section.links}
                            />
                        ))}
                    </nav>
                </div>
                <div className={styles.secondaryContent}>
                    <div className={styles.credits}>
                        <span>Built by</span>
                        <a className={styles.link}>Flowbase</a>
                        <span>· Powered by</span>
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
