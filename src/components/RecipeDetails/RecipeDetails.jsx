import React from "react";
import { useParams } from "react-router-dom";

import css from "./RecipeDetails.module.css";

const RecipeDetails = ({ recipes }) => {
  const { recipeId } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(recipeId));

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className={css.recipe_content}>
      <div className={css.recipe_image}>
        <img src={recipe.image_url} alt={recipe.name} />
      </div>
      <div className={css.recipe_text}>
        <h2 className={css.recipe_title}>{recipe.name}</h2>
        <p className={css.recipe_descr}>{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
