import { useState } from "react";
import searchRecipe from "./actions";

interface MealProps {
  idMeal: string;
  strMeal: string;
}

export default function Search() {
  const [result, setResult] = useState([] as MealProps[]);
  const [error, setError] = useState(false);

  const getData = async (formData: FormData) => {
    const response = await searchRecipe(formData);

    setResult(response);

    if (response.length) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h1>Rechercher une recette</h1>
      <form action={getData}>
        <input name="query" />
        <input type="submit" />
      </form>
      <ul>
        {result.map((r) => (
          <li key={r.idMeal}>{r.strMeal}</li>
        ))}
      </ul>
      {error ? "Aucun résultat" : null}
    </div>
  );
}
