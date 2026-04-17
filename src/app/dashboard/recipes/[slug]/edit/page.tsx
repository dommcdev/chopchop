import { notFound } from "next/navigation";

import { RecipeEditorForm } from "@/app/dashboard/recipes/[slug]/edit/_components/RecipeEditorForm";
import { getCategoriesForUser } from "@/data/categories";
import { fetchRecipeBlob } from "@/data/recipes";

export default async function RecipeEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [recipe, categories] = await Promise.all([
    fetchRecipeBlob(slug),
    getCategoriesForUser(),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <RecipeEditorForm
      recipe={{
        id: recipe.id,
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        categoryId: recipe.categoryId,
        ingredients: recipe.ingredients.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          unit: i.unit,
        })),
        instructions: recipe.instructions.map((s) => ({ text: s.text })),
      }}
      categories={categories}
    />
  );
}
