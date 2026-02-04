import { useState, ChangeEvent } from 'react';
import styles from './Card.module.css';
import Button from '../button/Button';
import { addToCart } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/hooks';
import type { MealItem } from '../../types/types';

interface CardProps {
    item: MealItem;
}

const Card = ({ item }: CardProps) => {
    const dispatch = useAppDispatch();
    const { meal, price, img, instructions, id } = item;

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                meal: { id, meal, price, img },
                quantity,
            }),
        );
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value, 10) || 1);
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
                        min={1}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={styles.quantityInput}
                        aria-label="Quantity"
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
