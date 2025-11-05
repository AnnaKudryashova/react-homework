import { useCart } from '../../contexts/CartContext.jsx';
import Button from '../button/Button.jsx';
import styles from './Card.module.css';

const Card = ({ item }) => {
    const { addToCart } = useCart();
    const { meal, price, img, instructions } = item;

    const handleAddToCart = () => {
        addToCart(1);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={img} alt={meal} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardName}>{meal}</div>
                    <div className={styles.cardPrice}>
                        ${price.toFixed(2)} USD
                    </div>
                </div>
                <div className={styles.cardDescription}>{instructions}</div>
                <div className={styles.cardActions}>
                    <input
                        type="number"
                        defaultValue="1"
                        readOnly
                        className={styles.quantityInput}
                    />
                    <Button
                        onClick={handleAddToCart}
                        className={styles.addToCartButton}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
