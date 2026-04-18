import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// ── Categories ──────────────────────────────────────────────────────────────
export const categories = sqliteTable("categories", {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull(),
  userId: text().notNull(), // Logical foreign key to Clerk
  name: text().notNull(),
  imageUrl: text(),
  imageKey: text(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ── Recipes ─────────────────────────────────────────────────────────────────
export const recipes = sqliteTable("recipes", {
  id: integer().primaryKey({ autoIncrement: true }),
  publicId: text().notNull().unique(), // Public identifier for URLs
  slug: text().notNull(),
  userId: text().notNull(), // Logical foreign key to Clerk
  name: text().notNull(),
  description: text(),
  servings: integer().notNull().default(1),
  prepTime: integer(),
  cookTime: integer(),
  categoryId: integer().references(() => categories.id),
  imageUrl: text(),
  imageKey: text(),
  createdAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .default(sql`(current_timestamp)`),
});

// ── Ingredients ─────────────────────────────────────────────────────────────
export const ingredients = sqliteTable("ingredients", {
  id: integer().primaryKey({ autoIncrement: true }),
  recipeId: integer()
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  name: text().notNull(),
  quantity: real(),
  unit: text(),
});

// ── Instructions ────────────────────────────────────────────────────────────
export const instructions = sqliteTable("instructions", {
  id: integer().primaryKey({ autoIncrement: true }),
  recipeId: integer()
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  stepNumber: integer().notNull(),
  text: text().notNull(),
});

// ** Relations **

export const categoriesRelations = relations(categories, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  category: one(categories, {
    fields: [recipes.categoryId],
    references: [categories.id],
  }),
  ingredients: many(ingredients),
  instructions: many(instructions),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));

export const instructionsRelations = relations(instructions, ({ one }) => ({
  recipe: one(recipes, {
    fields: [instructions.recipeId],
    references: [recipes.id],
  }),
}));

// Export the types so other files can use them
export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

export type Recipe = InferSelectModel<typeof recipes>;
export type NewRecipe = InferInsertModel<typeof recipes>;

export type Ingredient = InferSelectModel<typeof ingredients>;
export type NewIngredient = InferInsertModel<typeof ingredients>;
