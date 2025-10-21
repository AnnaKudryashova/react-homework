import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart.svg';
import { navItems } from '../../data/navData';

const cartCount = 0;
const Header = () => {
    return (
        <header className={styles.container}>
            <a href="/" className={styles.brandLink}>
                <img
                    src={logoIcon}
                    alt="Company Logo"
                    className={styles.brandLogo}
                />
            </a>
            <nav className={styles.navigation}>
                <ul className={styles.menu}>
                    {navItems.map((item) => (
                        <li key={item.label} className={styles.menuItem}>
                            {item.label}
                        </li>
                    ))}
                </ul>
                <button className={styles.cartButton}>
                    <img
                        src={cartIcon}
                        alt="Shopping cart"
                        className={styles.cartIcon}
                    />
                    <span className={styles.badge}>{cartCount}</span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
