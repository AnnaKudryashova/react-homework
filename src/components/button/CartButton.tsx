import { useNavigate } from 'react-router-dom';
import styles from './CartButton.module.css';
import cartIcon from '../../assets/icons/cart.svg';
import { useAppSelector } from '../../redux/hooks';

export const CartButton = () => {
    const navigate = useNavigate();
    const cartCount = useAppSelector((state) => state.cart.totalItems);

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
