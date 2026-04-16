"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateRecipeAction,
} from "@/data/recipesActions";
import type { UpdateRecipePayload } from "@/types";

type CategoryOption = { id: number; name: string; slug: string };

type IngredientRow = {
  name: string;
  quantity: string;
  unit: string;
};

type RecipeEditorFormProps = {
  recipe: {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    servings: number;
    prepTime: number | null;
    cookTime: number | null;
    categoryId: number | null;
    ingredients: Array<{
      name: string;
      quantity: number | null;
      unit: string | null;
    }>;
    instructions: Array<{ text: string }>;
  };
  categories: CategoryOption[];
};

function parseOptionalInt(raw: string): number | null {
  const t = raw.trim();
  if (t === "") return null;
  const n = Number.parseInt(t, 10);
  return Number.isFinite(n) ? n : null;
}

function parseQuantity(raw: string): number | null {
  const t = raw.trim();
  if (t === "") return null;
  const n = Number.parseFloat(t);
  return Number.isFinite(n) ? n : null;
}

export function RecipeEditorForm({
  recipe,
  categories,
}: RecipeEditorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [name, setName] = useState(recipe.name);
  const [slug, setSlug] = useState(recipe.slug);
  const [description, setDescription] = useState(recipe.description ?? "");
  const [servings, setServings] = useState(String(recipe.servings));
  const [prepTime, setPrepTime] = useState(
    recipe.prepTime != null ? String(recipe.prepTime) : "",
  );
  const [cookTime, setCookTime] = useState(
    recipe.cookTime != null ? String(recipe.cookTime) : "",
  );
  const [categoryId, setCategoryId] = useState(
    recipe.categoryId != null ? String(recipe.categoryId) : "",
  );

  const [ingredientRows, setIngredientRows] = useState<IngredientRow[]>(() =>
    recipe.ingredients.length
      ? recipe.ingredients.map((i) => ({
          name: i.name,
          quantity: i.quantity != null ? String(i.quantity) : "",
          unit: i.unit ?? "",
        }))
      : [{ name: "", quantity: "", unit: "" }],
  );

  const [instructionRows, setInstructionRows] = useState<string[]>(() =>
    recipe.instructions.length
      ? recipe.instructions.map((s) => s.text)
      : [""],
  );

  function buildPayload():
    | { ok: true; payload: UpdateRecipePayload }
    | { ok: false; error: string } {
    const prep = parseOptionalInt(prepTime);
    const cook = parseOptionalInt(cookTime);
    const serv = Number.parseInt(servings, 10);
    if (!Number.isFinite(serv) || serv < 1) {
      return { ok: false, error: "Servings must be a positive integer." };
    }

    const cat =
      categoryId === ""
        ? null
        : Number.parseInt(categoryId, 10);
    if (cat != null && Number.isNaN(cat)) {
      return { ok: false, error: "Invalid category." };
    }

    return {
      ok: true,
      payload: {
        recipeId: recipe.id,
        name,
        slug,
        description: description.trim() ? description : null,
        servings: serv,
        prepTime: prep,
        cookTime: cook,
        categoryId: cat,
        ingredients: ingredientRows.map((row) => ({
          name: row.name,
          quantity: parseQuantity(row.quantity),
          unit: row.unit.trim() ? row.unit.trim() : null,
        })),
        instructions: instructionRows.map((text) => ({ text })),
      },
    };
  }

  function handleSave() {
    setError(null);
    setStatus(null);
    const built = buildPayload();
    if (!built.ok) {
      setError(built.error);
      return;
    }

    startTransition(async () => {
      const result = await updateRecipeAction(built.payload);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setStatus("Saved.");
      if (built.payload.slug !== recipe.slug) {
        router.replace(`/dashboard/recipes/${built.payload.slug}/edit`);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/dashboard/recipes/${slug}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Back
        </Link>
        <Button type="button" disabled={isPending} onClick={handleSave}>
          {isPending ? "Saving…" : "Save"}
        </Button>
        {status ? (
          <span className="text-sm text-muted-foreground">{status}</span>
        ) : null}
      </div>

      <FieldSet>
        <FieldLegend>Recipe</FieldLegend>
        <FieldDescription>Core fields from recipes table.</FieldDescription>
        <FieldGroup className="@container/field-group">
          <Field>
            <FieldLabel htmlFor="recipe-name">Name</FieldLabel>
            <Input
              id="recipe-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="recipe-slug">Slug</FieldLabel>
            <Input
              id="recipe-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              autoComplete="off"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="recipe-description">Description</FieldLabel>
            <Textarea
              id="recipe-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="recipe-servings">Servings</FieldLabel>
            <Input
              id="recipe-servings"
              inputMode="numeric"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="recipe-prep">Prep time (minutes)</FieldLabel>
            <Input
              id="recipe-prep"
              inputMode="numeric"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="optional"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="recipe-cook">Cook time (minutes)</FieldLabel>
            <Input
              id="recipe-cook"
              inputMode="numeric"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              placeholder="optional"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="recipe-category">Category</FieldLabel>
            <select
              id="recipe-category"
              className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Ingredients</FieldLegend>
        <FieldDescription>
          Rows map to ingredients (replaced on save).
        </FieldDescription>
        <FieldGroup className="gap-6">
          {ingredientRows.map((row, index) => (
            <FieldGroup
              key={index}
              className="border-border rounded-md border p-3"
            >
              <Field>
                <FieldLabel htmlFor={`ing-name-${index}`}>Name</FieldLabel>
                <Input
                  id={`ing-name-${index}`}
                  value={row.name}
                  onChange={(e) => {
                    const next = [...ingredientRows];
                    next[index] = { ...row, name: e.target.value };
                    setIngredientRows(next);
                  }}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor={`ing-qty-${index}`}>Quantity</FieldLabel>
                <Input
                  id={`ing-qty-${index}`}
                  value={row.quantity}
                  onChange={(e) => {
                    const next = [...ingredientRows];
                    next[index] = { ...row, quantity: e.target.value };
                    setIngredientRows(next);
                  }}
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor={`ing-unit-${index}`}>Unit</FieldLabel>
                <Input
                  id={`ing-unit-${index}`}
                  value={row.unit}
                  onChange={(e) => {
                    const next = [...ingredientRows];
                    next[index] = { ...row, unit: e.target.value };
                    setIngredientRows(next);
                  }}
                />
              </Field>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setIngredientRows(ingredientRows.filter((_, i) => i !== index));
                }}
              >
                Remove row
              </Button>
            </FieldGroup>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setIngredientRows([
                ...ingredientRows,
                { name: "", quantity: "", unit: "" },
              ])
            }
          >
            Add ingredient
          </Button>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Instructions</FieldLegend>
        <FieldDescription>
          Order preserved; saved as step_number 1…n.
        </FieldDescription>
        <FieldGroup className="gap-4">
          {instructionRows.map((text, index) => (
            <Field key={index}>
              <FieldLabel htmlFor={`step-${index}`}>
                Step {index + 1}
              </FieldLabel>
              <Textarea
                id={`step-${index}`}
                value={text}
                onChange={(e) => {
                  const next = [...instructionRows];
                  next[index] = e.target.value;
                  setInstructionRows(next);
                }}
                rows={3}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setInstructionRows(
                    instructionRows.filter((_, i) => i !== index),
                  );
                }}
              >
                Remove step
              </Button>
            </Field>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setInstructionRows([...instructionRows, ""])}
          >
            Add step
          </Button>
        </FieldGroup>
      </FieldSet>

      {error ? (
        <Field data-invalid>
          <FieldError>{error}</FieldError>
        </Field>
      ) : null}
    </div>
  );
}
