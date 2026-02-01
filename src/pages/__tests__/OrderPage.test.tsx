import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderPage from '../OrderPage';
import * as hooks from '../../redux/hooks';
import { CartItem } from '../../redux/slices/cartSlice';
import {
    updateQuantity,
    removeFromCart,
    clearCart,
} from '../../redux/slices/cartSlice';

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();

beforeEach(() => {
    mockDispatch.mockClear();
    mockUseSelector.mockClear();

    vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch as any);
    vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector: any) =>
        mockUseSelector(selector),
    );
});

describe('OrderPage', () => {
    it('should display a message about empty cart', () => {
        mockUseSelector.mockImplementation((selector) => {
            return selector({
                cart: {
                    items: [],
                    totalPrice: 0,
                },
            });
        });

        render(<OrderPage />);

        expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
    });

    it('should display items and total amount', () => {
        const items: CartItem[] = [
            {
                id: '1',
                meal: 'Pizza',
                price: 10,
                img: 'pizza.jpg',
                quantity: 2,
            },
            {
                id: '2',
                meal: 'Burger',
                price: 5,
                img: 'burger.jpg',
                quantity: 1,
            },
        ];

        mockUseSelector.mockImplementation((selector) =>
            selector({
                cart: {
                    items,
                    totalPrice: 25,
                },
            }),
        );

        render(<OrderPage />);

        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Burger')).toBeInTheDocument();
        expect(screen.getByText('$ 25.00 USD')).toBeInTheDocument();
    });

    it('should dispatch updateQuantity when quantity changes', async () => {
        const user = userEvent.setup();

        const items: CartItem[] = [
            {
                id: '1',
                meal: 'Pizza',
                price: 10,
                img: 'pizza.jpg',
                quantity: 2,
            },
        ];

        mockUseSelector.mockImplementation((selector) =>
            selector({
                cart: {
                    items,
                    totalPrice: 20,
                },
            }),
        );

        render(<OrderPage />);

        const input = screen.getByDisplayValue('2');
        await user.clear(input);
        await user.type(input, '3');

        const wasUpdateQuantityCalled = mockDispatch.mock.calls.some(
            ([arg]) => arg.type === updateQuantity.type,
        );

        expect(wasUpdateQuantityCalled).toBe(true);
    });

    it('should dispatch removeFromCart when clicked X', async () => {
        const user = userEvent.setup();

        const items: CartItem[] = [
            {
                id: '1',
                meal: 'Pizza',
                price: 10,
                img: 'pizza.jpg',
                quantity: 2,
            },
        ];

        mockUseSelector.mockImplementation((selector) =>
            selector({
                cart: {
                    items,
                    totalPrice: 20,
                },
            }),
        );

        render(<OrderPage />);

        const removeButton = screen.getByRole('button', { name: 'X' });
        await user.click(removeButton);

        expect(mockDispatch).toHaveBeenCalledWith(removeFromCart('1'));
    });

    it('should clear the cart and show a message about the successful order', async () => {
        const user = userEvent.setup();

        const items: CartItem[] = [
            {
                id: '1',
                meal: 'Pizza',
                price: 10,
                img: 'pizza.jpg',
                quantity: 2,
            },
        ];

        mockUseSelector.mockImplementation((selector) =>
            selector({
                cart: {
                    items,
                    totalPrice: 20,
                },
            }),
        );

        render(<OrderPage />);

        const orderButton = screen.getByRole('button', { name: 'Order' });
        await user.click(orderButton);

        expect(mockDispatch).toHaveBeenCalledWith(clearCart());
        expect(
            screen.getByText('Your order has been placed successfully!'),
        ).toBeInTheDocument();
    });
});
