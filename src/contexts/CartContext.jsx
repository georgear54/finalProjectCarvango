import React, { createContext, useReducer } from "react";

const initialState = {
  cart: [],
};

const sortIngredients = (ingredients) => {
  return [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const sortedIngredients = sortIngredients(action.payload.ingredients);
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.ID === action.payload.ID &&
          JSON.stringify(sortIngredients(item.ingredients)) ===
            JSON.stringify(sortedIngredients)
      );

      if (existingItemIndex >= 0) {
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
            price: parseFloat(action.payload.price),
            ingredients: sortedIngredients,
          },
        ],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
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
            ? { ...item, quantity: (item.quantity || 1) - 1 }
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
