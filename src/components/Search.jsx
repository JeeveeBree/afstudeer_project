import { useState } from "react";
import { TextInput } from "./ui/Textinput";
import { data } from "../utils/data";

export const RecipeSearch = ({ setResults }) => {
  const [searchField, setSearchField] = useState("");

  const handleSearchChange = (event) => {
    const request = event.target.value.toLowerCase();
    setSearchField(request);
    console.log(request);

    const matchedRecipes = Array.isArray(data.hits)
      ? data.hits.filter((hit) => {
          const recipe = hit.recipe;

          const matchesLabel =
            recipe.label && recipe.label.toLowerCase().includes(request);

          const matchesHealthLabel =
            recipe.healthLabels &&
            recipe.healthLabels.some((label) =>
              label.toLowerCase().includes(request)
            );

          return matchesLabel || matchesHealthLabel;
        })
      : [];

    setResults(matchedRecipes);
  };

  return (
    <>
      <TextInput
        placeholder="Search for recipes or health labels:"
        onChange={handleSearchChange}
        value={searchField}
      />
    </>
  );
};
