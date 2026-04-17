import { fetchSearchData } from "@/data/recipes";
import SearchRecipesDialog from "./SearchRecipesDialog";

export default function SearchMounter() {
  const searchDataPromise = fetchSearchData();

  return <SearchRecipesDialog recipesPromise={searchDataPromise} />;
}
