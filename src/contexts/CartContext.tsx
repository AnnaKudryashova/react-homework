import { createContext, useContext, useState, PropsWithChildren } from 'react';

interface CartContextType {
    cartCount: number;
    addToCart: (quantity?: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

interface ICartProviderProps extends PropsWithChildren {}

const CartProvider = ({ children }: ICartProviderProps) => {
    const [cartCount, setCartCount] = useState<number>(0);

    const addToCart = (quantity: number = 1): void => {
        setCartCount((previousCount) => previousCount + quantity);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};

export { CartContext, CartProvider, useCartContext };
