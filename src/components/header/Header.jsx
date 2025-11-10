import { CartButton } from '../button/CartButton';
import styles from './Header.module.css';
import logoIcon from '../../assets/icons/logo.svg';
import { navItems } from '../../data/navData';

const Header = ({ activeIndex = 0 }) => {
    return (
        <header className={styles.container}>
            <div className={styles.content}>
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
                                        index === activeIndex
                                            ? styles.active
                                            : ''
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
