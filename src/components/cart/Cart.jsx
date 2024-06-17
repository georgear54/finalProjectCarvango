import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import classes from "./cart.module.css";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const handleRemoveFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const handleDecreaseQuantity = (item) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  };

  const handleIncreaseQuantity = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  };

  const calculateSubtotal = () => {
    return state.cart.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
  };

  return (
    <div className={classes.cartPage}>
      <h1 className={classes.cartTitle}>Your Cart Items</h1>
      {state.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={classes.cartItems}>
          {state.cart.map((item) => (
            <div key={item.ID} className={classes.cartItem}>
              <img
                src={item.img}
                alt={item.name}
                className={classes.cartImage}
              />
              <div className={classes.cartInfo}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <div className={classes.cartQuantity}>
                  <button onClick={() => handleDecreaseQuantity(item)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item)}>
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className={classes.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={classes.cartSubtotal}>
            <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
