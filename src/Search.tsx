import axios from "axios";
import { useState } from "react";

interface MealProps {
  idMeal: string;
  strMeal: string;
}

export default function Search() {
  const [data, setData] = useState([] as MealProps[]);
  const [error, setError] = useState("" as string);

  const searchRecipe = async (formData: FormData) => {
    try {
      const query = formData.get("query");
      const result = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
      );

      if (result.data.meals === "no data found") {
        setError("Pas de résultats");
      } else {
        setData(result.data.meals);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw new Error("Une erreur à eu lieu");
    }
  };

  return (
    <div>
      <h1>Rechercher une recette</h1>
      <form action={searchRecipe}>
        <input name="query" />
        <input type="submit" />
      </form>
      {data.map((recipe) => (
        <p key={recipe.idMeal}>{recipe.strMeal}</p>
      ))}
      {error}
    </div>
  );
}
