import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import { navItems } from '../../data/navData';
import { CartButton } from '../button/CartButton';

const cartCount = 0;
const Header = () => {
    return (
        <header className={styles.container}>
            <div class={styles.content}>
                <a href="/" className={styles.brandLink}>
                    <img
                        src={logoIcon}
                        alt="Company Logo"
                        className={styles.brandLogo}
                    />
                </a>
                <div className={styles.cartNav}>
                    <nav className={styles.navigation}>
                        <ul className={styles.menu}>
                            {navItems.map((item, index) => (
                                <li
                                    key={item.label}
                                    className={`${styles.menuItem} ${
                                        index === 0 ? styles.active : ''
                                    }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
