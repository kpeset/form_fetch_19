import axios from "axios";

const searchRecipe = async (formData: FormData) => {
  try {
    const query = formData.get("query");
    const result = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
    );

    if (result.data.meals === "no data found" || !result.data.meals) {
      return [];
    }
    return result.data.meals;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Erreur");
  }
};

export default searchRecipe;
