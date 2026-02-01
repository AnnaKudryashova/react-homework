import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from '../../../redux/slices/cartSlice';
import { CartButton } from '../CartButton';

const navigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigate,
    };
});

const renderWithStore = (preloadedState: { cart: CartState }) => {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState,
    });
    return render(
        <Provider store={store}>
            <CartButton />
        </Provider>,
    );
};

describe('CartButton', () => {
    beforeEach(() => {
        navigate.mockClear();
    });

    it('should display quantity of items in the cart', () => {
        renderWithStore({
            cart: {
                items: [],
                totalItems: 5,
                totalPrice: 100,
            },
        });

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should go to /order on click', async () => {
        const user = userEvent.setup();

        renderWithStore({
            cart: {
                items: [],
                totalItems: 0,
                totalPrice: 0,
            },
        });

        const button = screen.getByRole('button');
        await user.click(button);

        expect(navigate).toHaveBeenCalledWith('/order');
    });
});
