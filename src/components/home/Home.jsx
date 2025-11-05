import styles from './Home.module.css';
import Button from '../Button/Button.jsx';
import foodImage from '../../assets/images/home.png';
import trustpilotIcon from '../../assets/icons/trustpilot.svg';

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <div className={styles.headline}>
                        <span className={styles.ctaContainer}>
                            Beautiful food &amp; takeaway,{' '}
                            <span className={styles.ctaLink}>delivered</span> to
                            your door.
                        </span>
                    </div>
                    <div className={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&#39;s standard dummy text ever since the 1500.
                    </div>
                    <div className={styles.actions}>
                        <Button
                            onClick={() => console.log('You placed an order!')}
                        >
                            Place an Order
                        </Button>
                    </div>
                    <div className={styles.trustIndicator}>
                        <img
                            className={styles.trustpilotIcon}
                            src={trustpilotIcon}
                            alt="Trustpilot"
                        />
                        <div className={styles.rating}>
                            <a href="/" className={styles.ratingLink}>
                                <span className={styles.ratingScore}>
                                    4.8 out of 5
                                </span>
                            </a>
                            based on 2000+ reviews
                        </div>
                    </div>
                </div>
                <div className={styles.visual}>
                    <img
                        className={styles.heroVisual}
                        src={foodImage}
                        alt="Food and Takeaway"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
