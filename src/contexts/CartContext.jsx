import React, { createContext, useReducer } from "react";

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
      };
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item, index) =>
          index === action.payload.index
            ? { ...item, ...action.payload.item }
            : item
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.ID === action.payload.ID
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.ID === action.payload.ID && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
