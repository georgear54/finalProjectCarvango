import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./menu.module.css"; // Importing CSS Modules

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu  ")
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        setError("There was an error fetching the meals!");
        console.error("There was an error fetching the meals!", error);
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
        {error ? (
          <div className={classes.error}>{error}</div>
        ) : (
          meals.map((meal) => (
            <div key={meal.ID} className={classes.mealItem}>
              <img
                src={meal.image}
                alt={meal.name}
                className={classes.mealImage}
              />
              <div className={classes.mealInfo}>
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
                <p className={classes.mealPrice}>${meal.price}</p>
                <ul>
                  {meal.ingredients.map((ingredient) => (
                    <li key={ingredient.ID}>
                      {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAddToCart(meal)}
                  className={classes.buyButton}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </main>
      <footer className={classes.menuFooter}>
        <p>&copy; 2024 Falafel Food Order System</p>
      </footer>
    </div>
  );
};

export default MenuPage;