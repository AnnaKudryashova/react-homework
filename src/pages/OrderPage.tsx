import { ReactNode, useState } from 'react';
import QuantityInput from '../components/input/QuantityInput';
import styles from './OrderPage.module.css';
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from '../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface OrderLayoutProps {
    children: ReactNode;
}

const OrderLayout = ({ children }: OrderLayoutProps) => (
    <div className={`${styles.orderPage} menu-bg`}>
        <h1 className={styles.title}>Finish your order</h1>
        {children}
    </div>
);

const OrderPage = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);

    const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

    const handleOrderClick = () => {
        dispatch(clearCart());
        setOrderPlaced(true);
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: string, newQuantity: string) => {
        const quantity = parseInt(newQuantity, 10) || 1;
        dispatch(updateQuantity({ id, quantity }));
    };

    if (orderPlaced) {
        return (
            <OrderLayout>
                <div className={styles.successMessage}>
                    <p className={styles.successText}>
                        Your order has been placed successfully!
                    </p>
                </div>
            </OrderLayout>
        );
    }

    if (cartItems.length === 0) {
        return (
            <OrderLayout>
                <p className={styles.emptyCart}>Your cart is empty!</p>
            </OrderLayout>
        );
    }

    return (
        <OrderLayout>
            <div className={styles.cardList}>
                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cardRow}>
                        <div className={styles.cardInfo}>
                            <img
                                src={item.img}
                                alt={item.meal}
                                className={styles.image}
                            />
                            <span className={styles.mealTitle}>
                                {item.meal}
                            </span>
                        </div>
                        <div className={styles.cardRight}>
                            <span className={styles.price}>
                                $ {item.price.toFixed(2)} USD
                            </span>
                            <QuantityInput
                                value={item.quantity}
                                onChange={(e) =>
                                    handleQuantityChange(
                                        item.id,
                                        e.target.value,
                                    )
                                }
                            />
                            <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.totalSection}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>
                    $ {totalPrice.toFixed(2)} USD
                </span>
            </div>

            <form className={styles.form}>
                <div className={styles.fieldRow}>
                    <label className={styles.label} htmlFor="street">
                        Street
                    </label>
                    <input
                        id="street"
                        type="text"
                        className={styles.input}
                        placeholder=""
                    />
                </div>
                <div className={styles.fieldRow}>
                    <label className={styles.label} htmlFor="house">
                        House
                    </label>
                    <input
                        id="house"
                        type="text"
                        className={styles.input}
                        placeholder=""
                    />
                </div>
                <button
                    type="button"
                    className={styles.orderButton}
                    onClick={handleOrderClick}
                >
                    Order
                </button>
            </form>
        </OrderLayout>
    );
};

export default OrderPage;
