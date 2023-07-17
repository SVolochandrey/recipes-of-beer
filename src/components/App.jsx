import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import getRecipes from "../API";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import "./App.css";
import Header from "./Header/Header";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes(page);
      setRecipes((prevRecipes) => [...prevRecipes, ...data]);
    };

    fetchRecipes();
  }, [page]);

  const handleSelectRecipe = (recipe) => {
    if (selectedRecipes.includes(recipe.id)) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipe.id));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe.id]);
    }
  };

  const handleDeleteSelected = () => {
    setRecipes(
      recipes.filter((recipe) => !selectedRecipes.includes(recipe.id))
    );
    setSelectedRecipes([]);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RecipeList
              recipes={recipes}
              selectedRecipes={selectedRecipes}
              onSelectRecipe={handleSelectRecipe}
              onDeleteSelected={handleDeleteSelected}
            />
          }
        ></Route>
        <Route
          path="/recipes/:recipeId"
          exact
          element={<RecipeDetails recipes={recipes} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
