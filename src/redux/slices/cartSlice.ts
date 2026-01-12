import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MealItem } from '../../types/types';

export interface CartItem {
    id: string;
    meal: string;
    price: number;
    img: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => ({
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    ),
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ meal: MealItem; quantity: number }>,
        ) => {
            const { meal, quantity } = action.payload;

            if (!quantity || quantity <= 0) {
                return;
            }

            const existingItem = state.items.find(
                (item) => item.id === meal.id,
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: meal.id,
                    meal: meal.meal,
                    price: meal.price,
                    img: meal.img,
                    quantity,
                });
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>,
        ) => {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                state.items = state.items.map((item) =>
                    item.id === id ? { ...item, quantity } : item,
                );
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
