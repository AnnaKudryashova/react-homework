import { useState } from 'react';
import { useCartContext } from '../../contexts/CartContext.jsx';
import Button from '../button/Button.jsx';
import styles from './Card.module.css';

const Card = ({ item }) => {
    const { addToCart } = useCartContext();
    const { meal, price, img, instructions } = item;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(quantity);
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
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                        }
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
