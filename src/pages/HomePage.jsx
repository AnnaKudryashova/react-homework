import Header from '../components/Header/Header';
import HomeMainSection from '../components/homeMainSection/HomeMainSection';
import Footer from '../components/footer/Footer';
import styles from './HomePage.module.css';

const HomePage = () => (
    <div className={styles.homePage}>
        <Header />
        <HomeMainSection />
        <Footer />
    </div>
);

export default HomePage;
