import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const recalcTotals = (state) => {
    state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { meal, quantity } = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === meal.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: meal.id,
                    meal: meal.meal,
                    price: meal.price,
                    img: meal.img,
                    quantity: quantity,
                });
            }

            recalcTotals(state);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);

            recalcTotals(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
                recalcTotals(state);
            }
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
