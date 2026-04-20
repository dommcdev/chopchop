import { fetchCategories } from "@/data/categories";
import CategoryCard from "./CategoryCard";

export default async function CategoriesList() {
  const allCategories = await fetchCategories();

  return (
    <>
      {allCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </>
  );
}
