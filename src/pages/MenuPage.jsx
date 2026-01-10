import Menu from '../components/menu/Menu';
import menuBg from '../assets/images/menu-bg.svg';
import styles from './MenuPage.module.css';

const MenuPage = () => (
    <div
        className={styles.menuPage}
        style={{ backgroundImage: `url("${menuBg}")` }}
    >
        <Menu />
    </div>
);

export default MenuPage;
