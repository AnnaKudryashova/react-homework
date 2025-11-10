import Header from '../components/Header/Header';
import Menu from '../components/menu/Menu';
import Footer from '../components/footer/Footer';
import styles from './MenuPage.module.css';

const MenuPage = () => (
    <div className={styles.menuPage}>
        <Header activeIndex={1} />
        <Menu />
        <Footer />
    </div>
);

export default MenuPage;
