import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice.js';
import Button from '../button/Button.jsx';
import styles from './Card.module.css';

const Card = ({ item }) => {
    const dispatch = useDispatch();
    const { meal, price, img, instructions, id } = item;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                meal: { id, meal, price, img },
                quantity: quantity,
            })
        );
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
