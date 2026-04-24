import { fetchCategories } from "@/data/categories";
import { NewRecipeClient } from "./NewRecipeClient";

export default async function NewRecipePage() {
  const categoriesPromise = fetchCategories();
  //TODO add suspense here
  return <NewRecipeClient categoriesPromise={categoriesPromise} />;
}
