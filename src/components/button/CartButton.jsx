import styles from './CartButton.module.css';
import cartIcon from '../../assets/icons/cart.svg';
import { useCart } from '../../contexts/CartContext.jsx';

export const CartButton = () => {
    const { cartCount } = useCart();
    return (
        <button className={styles.cartButton}>
            <img
                src={cartIcon}
                alt="Shopping cart"
                className={styles.cartIcon}
            />
            <span className={styles.cartCount}>{cartCount}</span>
        </button>
    );
};
