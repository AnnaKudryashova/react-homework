import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CartButton } from '../button/CartButton';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import { navItems } from '../../data/navData';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/', { replace: true });
    };

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
                            {navItems.map((item) => {
                                let actualPath = item.path;
                                return (
                                    <li
                                        key={item.label}
                                        className={styles.menuItem}
                                    >
                                        <NavLink
                                            to={actualPath}
                                            className={({ isActive }) =>
                                                `${styles.menuLink} ${
                                                    isActive
                                                        ? styles.active
                                                        : ''
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                );
                            })}
                            {!user ? (
                                <li className={styles.menuItem}>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `${styles.menuLink} ${
                                                isActive ? styles.active : ''
                                            }`
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            ) : (
                                <li className={styles.menuItem}>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className={styles.menuButton}
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
