import CategoryCard from "./CategoryCard";
import { CategoryBrief } from "@/types";
import { fetchCategories } from "@/data/categories";

export default async function CategoriesGrid() {
  const allCategories = await fetchCategories();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {allCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
