import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../button/Button';
import foodImage from '../../assets/images/home.png';
import trustpilotIcon from '../../assets/icons/trustpilot.svg';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handlePlaceOrder = () => {
        navigate('/order');
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <div className={styles.headline}>
                        <span className={styles.ctaContainer}>
                            {t('home.headlinePrefix')}{' '}
                            <span className={styles.ctaLink}>
                                {t('home.headlineHighlighted')}
                            </span>{' '}
                            {t('home.headlineSuffix')}
                        </span>
                    </div>
                    <div className={styles.description}>
                        {t('home.description')}
                    </div>
                    <div className={styles.actions}>
                        <Button onClick={handlePlaceOrder}>
                            {t('home.button')}
                        </Button>
                    </div>
                    <div className={styles.trustIndicator}>
                        <img
                            className={styles.trustpilotIcon}
                            src={trustpilotIcon}
                            alt={t('home.trustpilotLabel')}
                        />
                        <div className={styles.rating}>
                            <a href="/" className={styles.ratingLink}>
                                <span className={styles.ratingScore}>
                                    {t('home.ratingScore')}
                                </span>
                            </a>
                            {` ${t('home.ratingText')}`}
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
