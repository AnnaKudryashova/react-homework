import { NavLink, Link } from 'react-router-dom';
import { CartButton } from '../button/CartButton';
import { AuthMenuItem } from './AuthMenuItem';
import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import { navItems } from '../../data/navData';

const Header = () => {
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
                <div className={styles.cartNav}>
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
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                            <AuthMenuItem />
                        </ul>
                    </nav>
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
