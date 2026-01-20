import Home from '../components/home/Home';
import styles from './HomePage.module.css';

const HomePage = () => (
    <div className={`${styles.homePage} homePage-bg`}>
        <Home />
    </div>
);

export default HomePage;
