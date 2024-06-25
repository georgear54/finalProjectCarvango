import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import classes from "./menu.module.css";
import { CartContext } from "../../contexts/CartContext";
import IngredientsModal from "../IngredientModal/IngredientsModal";

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

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setMeals(
          response.data.map((meal) => ({
            ...meal,
            img: imageMap[meal.name] || "../../assets/imgs/aMeal.jpg.png",
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
    dispatch({ type: "ADD_TO_CART", payload: mealWithIngredients });
    console.log(`${mealWithIngredients.name} added to cart!`);
    setShowModal(false);
    setSelectedMeal(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeal(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={classes.menuPage}>
      <header className={classes.menuHeader}>
        <h1>Our Menu</h1>
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearch}
          className={classes.searchBar}
        />
      </header>
      <main className={classes.menuMain}>
        {error && <div className={classes.error}>{error}</div>}
        <div className={classes.foodGrid}>
          {filteredMeals.map((meal) => (
            <div key={meal.ID} className={classes.mealItem}>
              <img
                src={meal.img}
                alt={meal.name}
                className={classes.mealImage}
              />
              <div className={classes.mealInfo}>
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
                <p>Allergies: {meal.allergies}</p>
                <p>Price: ${parseFloat(meal.price).toFixed(2)}</p>
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
