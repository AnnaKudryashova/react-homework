import cartReducer, {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    CartItem,
} from '../cartSlice';
import { describe, it, expect } from 'vitest';

const initialState = {
    items: [] as CartItem[],
    totalItems: 0,
    totalPrice: 0,
};

const meal = {
    id: '1',
    meal: 'Pizza',
    price: 10,
    img: 'pizza.jpg',
};

describe('cartSlice', () => {
    it('should add a new item to the cart', () => {
        const action = addToCart({ meal, quantity: 2 });
        const state = cartReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toMatchObject({
            id: '1',
            meal: 'Pizza',
            price: 10,
            quantity: 2,
        });
        expect(state.totalItems).toBe(2);
        expect(state.totalPrice).toBe(20);
    });

    it('should increase the quantity of items', () => {
        const stateWithItem = cartReducer(
            initialState,
            addToCart({ meal, quantity: 1 }),
        );

        const newState = cartReducer(
            stateWithItem,
            addToCart({ meal, quantity: 3 }),
        );

        expect(newState.items).toHaveLength(1);
        expect(newState.items[0].quantity).toBe(4);
        expect(newState.totalItems).toBe(4);
        expect(newState.totalPrice).toBe(40);
    });

    it('should not add quantity zero and less', () => {
        const state = cartReducer(
            initialState,
            addToCart({ meal, quantity: 0 }),
        );

        expect(state.items).toHaveLength(0);
        expect(state.totalItems).toBe(0);
        expect(state.totalPrice).toBe(0);
    });

    it('should remove an item from the cart', () => {
        const stateWithItem = cartReducer(
            initialState,
            addToCart({ meal, quantity: 2 }),
        );

        const newState = cartReducer(stateWithItem, removeFromCart('1'));

        expect(newState.items).toHaveLength(0);
        expect(newState.totalItems).toBe(0);
        expect(newState.totalPrice).toBe(0);
    });

    it('should update quantity', () => {
        const stateWithItem = cartReducer(
            initialState,
            addToCart({ meal, quantity: 2 }),
        );

        const newState = cartReducer(
            stateWithItem,
            updateQuantity({ id: '1', quantity: 5 }),
        );

        expect(newState.items[0].quantity).toBe(5);
        expect(newState.totalItems).toBe(5);
        expect(newState.totalPrice).toBe(50);
    });

    it('should remove item with quantity <= 0 in updateQuantity', () => {
        const stateWithItem = cartReducer(
            initialState,
            addToCart({ meal, quantity: 2 }),
        );

        const newState = cartReducer(
            stateWithItem,
            updateQuantity({ id: '1', quantity: 0 }),
        );

        expect(newState.items).toHaveLength(0);
        expect(newState.totalItems).toBe(0);
        expect(newState.totalPrice).toBe(0);
    });

    it('should clear the cart when clearCart', () => {
        const stateWithItem = cartReducer(
            initialState,
            addToCart({ meal, quantity: 2 }),
        );

        const newState = cartReducer(stateWithItem, clearCart());

        expect(newState.items).toHaveLength(0);
        expect(newState.totalItems).toBe(0);
        expect(newState.totalPrice).toBe(0);
    });

    it('should update only the item with matching id in updateQuantity', () => {
        const stateWithItems = cartReducer(
            initialState,
            addToCart({ meal, quantity: 2 }),
        );
        const otherMeal = { ...meal, id: '2', meal: 'Burger', price: 5 };
        const stateWithTwoItems = cartReducer(
            stateWithItems,
            addToCart({ meal: otherMeal, quantity: 1 }),
        );

        const newState = cartReducer(
            stateWithTwoItems,
            updateQuantity({ id: '1', quantity: 5 }),
        );

        expect(newState.items).toHaveLength(2);
        expect(newState.items.find((i) => i.id === '1')?.quantity).toBe(5);
        expect(newState.items.find((i) => i.id === '2')?.quantity).toBe(1);
    });
});
