//cartjsx
import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import classes from "./cart.module.css";
import IngredientsModal from "../IngredientModal/IngredientsModal";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleAddToCart = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleAddIngredients = (mealWithIngredients) => {
    dispatch({ type: "ADD_TO_CART", payload: mealWithIngredients });
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const incrementQuantity = (item) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: item });
  };

  const removeFromCart = (index) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: index });
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  return (
    <div className={classes.cartPage}>
      <h1>Your Cart Items</h1>
      <div className={classes.cartItems}>
        {cart.map((item, index) => (
          <div key={item.ID} className={classes.cartItem}>
            <img src={item.img} alt={item.name} className={classes.cartImage} />
            <div className={classes.cartInfo}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Allergies: {item.allergies}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <h3>Ingredients:</h3>
              <ul>
                {item.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>
              <div className={classes.quantityControl}>
                <span>{item.quantity || 1}</span>
                <button onClick={() => handleAddToCart(item)}>+</button>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className={classes.removeButton}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.subtotal}>
        <h3>Subtotal: ${calculateSubtotal()}</h3>
      </div>
      {showModal && (
        <IngredientsModal
          meal={selectedMeal}
          onAdd={handleAddIngredients}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Cart;
