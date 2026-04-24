import { fetchCategories } from "@/data/categories";
import { NewRecipeClient } from "./NewRecipeClient";

export default async function NewRecipePage() {
  const categoriesPromise = fetchCategories();
  return <NewRecipeClient categoriesPromise={categoriesPromise} />;
}
