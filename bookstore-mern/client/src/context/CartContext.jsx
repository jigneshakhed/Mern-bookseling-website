import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (book) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.book._id === book._id);
            if (existing) {
                return prev.map((item) =>
                    item.book._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { book, quantity: 1 }];
        });
    };

    const removeFromCart = (bookId) => {
        setCart((prev) => prev.filter((item) => item.book._id !== bookId));
    };

    const updateQuantity = (bookId, quantity) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) =>
                item.book._id === bookId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
