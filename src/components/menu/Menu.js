import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./menu.module.css"; // Importing CSS Modules
import { NewFoodItems, formatPrice } from "../Data/foodData";

const MenuPage = () => {
  const [meals, setMeals] = useState(NewFoodItems["Meal"]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        setError("There was an error fetching the meals!");
        console.error("There was an error fetching the meals!", error);
        // Fallback to static data
        setMeals(NewFoodItems["Meal"]);
      });
  }, []);

  const handleAddToCart = (meal) => {
    // Logic to add the meal to the cart
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
            <div key={meal.name} className={classes.mealItem}>
              <img
                src={meal.img}
                alt={meal.name}
                className={classes.mealImage}
              />
              <div className={classes.mealInfo}>
                <h2>{meal.name}</h2>
                <p>{formatPrice(meal.price)}</p>
                <button
                  onClick={() => handleAddToCart(meal)}
                  className={classes.buyButton}
                >
                  Add to Cart
                </button>
              </div>
              {/* Assuming ingredients are part of the meal object */}
              {meal.ingredients && (
                <div className={classes.ingredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {meal.ingredients.map((ingredient) => (
                      <li key={ingredient.ID}>
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
      <footer className={classes.menuFooter}>
        <p>&copy; 2024 Falafel Food Order System</p>
      </footer>
    </div>
  );
};

export default MenuPage;
