import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from '../redux/slices/cartSlice.js';
import menuBg from '../assets/images/menu-bg.svg';
import styles from './OrderPage.module.css';

const OrderPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleOrderClick = () => {
        dispatch(clearCart());
        setOrderPlaced(true);
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        const quantity = parseInt(newQuantity) || 1;
        dispatch(updateQuantity({ id, quantity }));
    };

    if (orderPlaced) {
        return (
            <div
                className={styles.orderPage}
                style={{ backgroundImage: `url("${menuBg}")` }}
            >
                <h1 className={styles.title}>Finish your order</h1>
                <div className={styles.successMessage}>
                    <p className={styles.successText}>
                        Your order has been placed successfully!
                    </p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div
                className={styles.orderPage}
                style={{ backgroundImage: `url("${menuBg}")` }}
            >
                <h1 className={styles.title}>Finish your order</h1>
                <p className={styles.emptyCart}>Your cart is empty!</p>
            </div>
        );
    }

    return (
        <div
            className={styles.orderPage}
            style={{ backgroundImage: `url("${menuBg}")` }}
        >
            <h1 className={styles.title}>Finish your order</h1>

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

                            <div className={styles.quantityWrapper}>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                    className={styles.quantityInput}
                                />
                            </div>

                            <button
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
        </div>
    );
};

export default OrderPage;
