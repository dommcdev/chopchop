import { fetchSearchData } from "@/data/recipes";
import SearchRecipesDialog from "./SearchRecipesDialog";

export default function SearchMounter() {
  // Initiate the promise here.
  // Because we don't 'await' it, this component renders instantly.
  const promise = fetchSearchData();

  return <SearchRecipesDialog recipesPromise={promise} />;
}
