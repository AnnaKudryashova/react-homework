import { NavLink, Link } from 'react-router-dom';
import { CartButton } from '../button/CartButton';
import { AuthMenuItem } from './AuthMenuItem';
import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import { navItems } from '../../data/navData';
import { LanguageDropdown } from './LanguageDropdown';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link to="/" className={styles.brandLink}>
                    <img
                        src={logoIcon}
                        alt="Company Logo"
                        className={styles.brandLogo}
                    />
                </Link>

                <ThemeToggle />
                <nav className={styles.navigation}>
                    <ul className={styles.menu}>
                        {navItems.map(({ path, label }) => (
                            <li key={label} className={styles.menuItem}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `${styles.menuLink} ${
                                            isActive ? styles.active : ''
                                        }`
                                    }
                                >
                                    {t(label)}
                                </NavLink>
                            </li>
                        ))}
                        <AuthMenuItem />
                    </ul>
                </nav>

                <div className={styles.utilities}>
                    <LanguageDropdown />
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
