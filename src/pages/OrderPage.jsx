import menuBg from '../assets/images/menu-bg.svg';
import styles from './OrderPage.module.css';

const OrderPage = () => {
    return (
        <div
            className={styles.orderPage}
            style={{ backgroundImage: `url("${menuBg}")` }}
        >
            <h1 className={styles.title}>Finish your order</h1>
        </div>
    );
};

export default OrderPage;
