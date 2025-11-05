import Header from '../components/Header/Header';
import Home from '../components/home/Home';
import Footer from '../components/footer/Footer';
import styles from './HomePage.module.css';

const HomePage = () => (
    <div className={styles.homePage}>
        <Header activeIndex={0} />
        <Home />
        <Footer />
    </div>
);

export default HomePage;
