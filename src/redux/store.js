import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice.js';
import mealsReducer from './slices/mealsSlice.js';
import filterReducer from './slices/filterSlice.js';
import loginReducer from './slices/loginSlice.js';
import authReducer from './slices/authSlice.js';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        meals: mealsReducer,
        filter: filterReducer,
        login: loginReducer,
        auth: authReducer,
    },
});
