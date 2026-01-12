import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import mealsReducer from './slices/mealsSlice';
import filterReducer from './slices/filterSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        meals: mealsReducer,
        filter: filterReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
