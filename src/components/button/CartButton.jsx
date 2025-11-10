import styles from './CartButton.module.css';
import cartIcon from '../../assets/icons/cart.svg';
import { useCartContext } from '../../contexts/CartContext.jsx';

export const CartButton = () => {
    const { cartCount } = useCartContext();
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
