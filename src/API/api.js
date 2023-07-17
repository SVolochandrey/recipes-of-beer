import axios from "axios";

const getRecipes = async (page) => {
  try {
    const response = await axios.get(
      `https://api.punkapi.com/v2/beers?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export default getRecipes;
