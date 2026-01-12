import Home from '../components/home/Home';
import home_bg from '../assets/images/home-bg.svg';
import styles from './HomePage.module.css';

const HomePage = () => (
    <div
        className={styles.homePage}
        style={{ backgroundImage: `url("${home_bg}")` }}
    >
        <Home />
    </div>
);

export default HomePage;
