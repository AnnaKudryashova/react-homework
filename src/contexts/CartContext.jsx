import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (quantity = 1) => {
        setCartCount((previousCount) => previousCount + quantity);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};

export { CartContext, CartProvider, useCartContext };
