import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Shop = () => {
  const { state, dispatch } = useContext(CartContext);

  // Add your component logic here...

  return (
    <div>
      <h1>Shop Page</h1>
      {/* Your shop component UI goes here... */}
    </div>
  );
};

export default Shop;
