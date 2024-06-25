import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import classes from "./menu.module.css";
import { CartContext } from "../../contexts/CartContext";
import IngredientsModal from "../IngredientModal/IngredientModal";

const imageMap = {
  "Spaghetti Carbonara": require("../../assets/imgs/aMeal.jpg.png"),
  "Margherita Pizza": require("../../assets/imgs/bMeal.jpg.png"),
  "Caesar Salad": require("../../assets/imgs/cMeal.jpg.png"),
  "Chicken Alfredo": require("../../assets/imgs/dMeal.jpg.png"),
  "Beef Tacos": require("../../assets/imgs/eMeal.jpg.png"),
  "Vegan Burger": require("../../assets/imgs/fMeal.jpg.png"),
  "Grilled Salmon": require("../../assets/imgs/gMeal.jpg.png"),
  "Chocolate Cake": require("../../assets/imgs/hMeal.jpg.png"),
  "French Fries": require("../../assets/imgs/iMeal.jpg.png"),
  "Mushroom Risotto": require("../../assets/imgs/jMeal.jpg.png"),
};

const sortIngredients = (ingredients) => {
  return [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
};

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setMeals(
          response.data.map((meal) => ({
            ...meal,
            img: imageMap[meal.name] || "../../assets/imgs/defaultMeal.jpg",
            price: parseFloat(meal.price), // Ensure price is a number
          }))
        );
      })
      .catch((error) => {
        setError("There was an error fetching the meals!");
        console.error("There was an error fetching the meals!", error);
      });
  }, []);

  const handleAddToCart = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleAddIngredients = (mealWithIngredients) => {
    mealWithIngredients.ingredients = sortIngredients(
      mealWithIngredients.ingredients
    );
    dispatch({ type: "ADD_TO_CART", payload: mealWithIngredients });
    console.log(`${mealWithIngredients.name} added to cart!`);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeal(null);
  };

  return (
    <div className={classes.menuPage}>
      <header className={classes.menuHeader}>
        <h1>Our Menu</h1>
      </header>
      <main className={classes.menuMain}>
        {error && <div className={classes.error}>{error}</div>}
        <div className={classes.foodGrid}>
          {meals.map((meal) => (
            <div key={meal.ID} className={classes.mealItem}>
              <img
                src={meal.img}
                alt={meal.name}
                className={classes.mealImage}
              />
              <div className={classes.mealInfo}>
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
                <p>{meal.allergies}</p>
                <p>${meal.price.toFixed(2)}</p> {/* Ensure price is a number */}
                <button
                  onClick={() => handleAddToCart(meal)}
                  className={classes.buyButton}
                  aria-label={`Add ${meal.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
              {meal.ingredients && meal.ingredients.length > 0 && (
                <div className={classes.ingredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {meal.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} - {ingredient.quantity}{" "}
                        {ingredient.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      {showModal && (
        <IngredientsModal
          meal={selectedMeal}
          onAdd={handleAddIngredients}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MenuPage;
