import { Recipe } from "@/db/schema";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>

      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
        {recipe.description || "No description provided."}
      </p>

      <div className="flex gap-4 text-xs font-medium text-gray-400">
        <span>Prep: {recipe.prepTime}m</span>
        <span>Cook: {recipe.cookTime}m</span>
      </div>
    </div>
  );
}
