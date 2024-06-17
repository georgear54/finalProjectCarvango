import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import classes from "./menu.module.css";
import {CartContext} from "../../contexts/CartContext"; // Import CartContext

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
  // Add more mappings if you have more images
};

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(CartContext); // Use the CartContext

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => {
        console.log("Fetched data:", response.data);
        const mergedMeals = response.data.map((meal) => {
          const img =
            imageMap[meal.name] || "../../assets/imgs/defaultMeal.jpg";
          const ingredients = meal.ingredients.map((ing) => ({
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
          }));
          return {
            ...meal,
            img,
            ingredients,
          };
        });
        console.log("Merged meals:", mergedMeals);
        setMeals(mergedMeals);
      })
      .catch((error) => {
        setError("There was an error fetching the meals!");
        console.error("There was an error fetching the meals!", error);
      });
  }, []);

  const handleAddToCart = (meal) => {
    dispatch({ type: "ADD_TO_CART", payload: meal });
    console.log(`${meal.name} added to cart!`);
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
                <p>{meal.price}</p>
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
    </div>
  );
};

export default MenuPage;
