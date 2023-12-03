import React, { createContext, useContext, useState } from 'react';

const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [qrCode, setQrCode] = useState(null);


  const addToCart = (ticket) => {
    setCartItems([...cartItems, ticket]);
  };


  const removeFromCart = (ticketId) => {
    const updatedCart = cartItems.filter((ticket) => ticket.id !== ticketId);
    setCartItems(updatedCart);
  };

  const generateQrCode = (tickets) => {

    const qrCodeData = JSON.stringify(tickets);
    setQrCode(qrCodeData);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        generateQrCode,
        qrCode,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('test');
  }
  return context;
}