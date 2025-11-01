import styles from './CartButton.module.css';
import cartIcon from '../../assets/icons/cart.svg';
const cartCount = 0;
export const CartButton = () => {
    return (
        <button className={styles.cartButton}>
            <img
                src={cartIcon}
                alt="Shopping cart"
                className={styles.cartIcon}
            />
            <span className={styles.badge}>{cartCount}</span>
        </button>
    );
};
