import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CartButton } from '../button/CartButton';
import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import { navItems } from '../../data/navData';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logout());
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
                            {navItems.map((item) => (
                                <li
                                    key={item.label}
                                    className={styles.menuItem}
                                >
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `${styles.menuLink} ${
                                                isActive ? styles.active : ''
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
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
