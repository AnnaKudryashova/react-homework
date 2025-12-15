import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './CartButton.module.css';
import cartIcon from '../../assets/icons/cart.svg';

export const CartButton = () => {
    const navigate = useNavigate();
    const cartCount = useSelector((state) => state.cart.totalItems);

    const handleCartClick = () => {
        navigate('/order');
    };

    return (
        <button className={styles.cartButton} onClick={handleCartClick}>
            <img
                src={cartIcon}
                alt="Shopping cart"
                className={styles.cartIcon}
            />
            <span className={styles.cartCount}>{cartCount}</span>
        </button>
    );
};
