import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./menu.module.css"; // Importing CSS Modules
import { NewFoodItems } from "../Data/foodData"; // If you still want to use images from here

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu") // Ensure this matches your backend port and path
      .then((response) => {
        console.log("Fetched data:", response.data);
        const mergedMeals = response.data.map((meal) => {
          const imageData = NewFoodItems.find(
            (item) => item.name === meal.name
          );
          console.log("Image data:", imageData);
          return {
            ...meal,
            img: imageData ? imageData.img : "../../assets/imgs/aMeal.jpg.png",
          };
        });
        console.log("Merged meals:", mergedMeals);
        setMeals(mergedMeals);
      })
      .catch((error) => {
        setError("There was an error fetching the meals!");
        console.error("There was an error fetching the meals!", error);
        setMeals(NewFoodItems["Meal"]);
      });
  }, []);

  const handleAddToCart = (meal) => {
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
                <h2>{meal.name}</h2> {/* Fetching name from SQL */}
                <p>{meal.description}</p> {/* Fetching description from SQL */}
                <p>{meal.allergies}</p> {/* Fetching allergies from SQL */}
                <p>{meal.price}</p> {/* Fetching price from SQL */}
                <button
                  onClick={() => handleAddToCart(meal)}
                  className={classes.buyButton}
                >
                  Add to Cart
                </button>
              </div>
              {meal.ingredients && meal.ingredients.length > 0 && (
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
    </div>
  );
};

export default MenuPage;
