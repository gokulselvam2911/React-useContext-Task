// CartContext.js
import { createContext, useReducer } from 'react';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const itemExists = state.cartItems.find(item => item.id === action.payload.id);
            let updatedCartItems;

            if (itemExists) {
                updatedCartItems = state.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            }

            const totalQuantity = state.totalQuantity + 1;
            const totalAmount = state.totalAmount + action.payload.price;

            return { ...state, cartItems: updatedCartItems, totalQuantity, totalAmount };
        }
        case 'REMOVE_FROM_CART': {
            const updatedCartItems = state.cartItems.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            );

            const totalQuantity = state.totalQuantity - 1;
            const totalAmount = state.totalAmount - action.payload.price;

            return { ...state, cartItems: updatedCartItems, totalQuantity, totalAmount };
        }
        case 'REMOVE_ITEM': {
            const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);

            const totalQuantity = state.totalQuantity - action.payload.quantity;
            const totalAmount = state.totalAmount - (action.payload.price * action.payload.quantity);

            return { ...state, cartItems: updatedCartItems, totalQuantity, totalAmount };
        }
        case 'SET_CART_ITEMS': {
            return { ...state, cartItems: action.payload };
        }
        default:
            return state;
    }
};

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
