import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from "./RecipeList.module.css";

const RecipeList = ({ recipes, onSelectRecipe, onDeleteSelected }) => {
  const [visibleRecipes, setVisibleRecipes] = useState(5);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const handleLoadMore = () => {
    setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 5);
  };

  const handleRecipeClick = (recipe) => {
    onSelectRecipe(recipe);
  };

  const handleCheckboxChange = (recipeId) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes((prevSelectedRecipes) =>
        prevSelectedRecipes.filter((id) => id !== recipeId)
      );
    } else {
      setSelectedRecipes((prevSelectedRecipes) => [
        ...prevSelectedRecipes,
        recipeId,
      ]);
    }
  };

  const handleDeleteClick = () => {
    onDeleteSelected(selectedRecipes);
    setSelectedRecipes([]);
  };

  return (
    <div className={css.recipesPage}>
      <div className={css.list}>
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => handleRecipeClick(recipe)}
            className={css.recipeCard}
          >
            <Link to={`/recipes/${recipe.id}`} className={css.link}>
              <img
                src={recipe.image_url}
                alt={recipe.name}
                className={css.image}
              />
              <h3 className={css.title}>{recipe.name}</h3>
            </Link>
            <input
              className={css.checkbox}
              type="checkbox"
              checked={selectedRecipes.includes(recipe.id)}
              onChange={() => handleCheckboxChange(recipe.id)}
            />
          </div>
        ))}
      </div>
      <div className={css.BtnsContainer}>
        {selectedRecipes.length > 0 && (
          <button className={css.deleteBtn} onClick={handleDeleteClick}>
            Delete
          </button>
        )}
        {visibleRecipes < recipes.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more...
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
