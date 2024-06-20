//menu
const express = require("express");
const router = express.Router();
const doQuery = require("../database/query");

console.log("befor");
router.get("/", async (req, res) => {
  try {
    console.log("after");

    const dishes = await doQuery("SELECT * FROM dishes");

    const ingredientsPromises = dishes.map(async (dish) => {
      const ingredients = await doQuery(
        "SELECT ingredients.* FROM ingredient_dishes JOIN ingredients ON ingredient_dishes.ingredient_id = ingredients.ID WHERE ingredient_dishes.dish_id = ?",
        [dish.ID]
      );
      return { ...dish, ingredients };
    });

    const dishesWithIngredients = await Promise.all(ingredientsPromises);
    res.json(dishesWithIngredients);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ error: "Error fetching dishes" });
  }
});

module.exports = router;


