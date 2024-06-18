import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ingredientModal.module.css";

const IngredientsModal = ({ meal, onAdd, onClose }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(parseFloat(meal.price));

  useEffect(() => {
    axios
      .get("http://localhost:3001/ingredients")
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  }, []);

  const handleIngredientChange = (ingredient) => {
    let newSelectedIngredients;
    if (selectedIngredients.includes(ingredient)) {
      newSelectedIngredients = selectedIngredients.filter(
        (ing) => ing.ID !== ingredient.ID
      );
      setTotalPrice(totalPrice - parseFloat(ingredient.price));
    } else {
      newSelectedIngredients = [...selectedIngredients, ingredient];
      setTotalPrice(totalPrice + parseFloat(ingredient.price));
    }
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleAdd = () => {
    onAdd({
      ...meal,
      ingredients: selectedIngredients,
      price: totalPrice,
    });
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <h2>Add Ingredients to {meal.name}</h2>
        <ul className={classes.ingredientsList}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.ID}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIngredients.some(
                    (ing) => ing.ID === ingredient.ID
                  )}
                  onChange={() => handleIngredientChange(ingredient)}
                />
                {ingredient.name} - ${parseFloat(ingredient.price).toFixed(2)}
              </label>
            </li>
          ))}
        </ul>
        <div className={classes.modalFooter}>
          <p>Total Price: ${parseFloat(totalPrice).toFixed(2)}</p>
          <button onClick={handleAdd}>Add to Cart</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
