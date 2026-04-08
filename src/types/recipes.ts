export type RecipeWithDetails = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  servings: number;
  prepTime: number | null;
  cookTime: number | null;
  categoryId: number | null;
  categoryName: string | null;
  ingredients: Array<{
    id: number;
    name: string;
    quantity: number | null;
    unit: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
};
