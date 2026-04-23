"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { editorInSchema } from "@/lib/editor-in-schema";
import {
  editorOutSchema,
  EditorFormState,
  EditorOutSchema,
} from "@/lib/editor-out-schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export function RecipeEditor({ existingRecipeData = {} }) {
  const form = useForm<EditorFormState, unknown, EditorOutSchema>({
    // What to use to validate data during editing and on submit
    resolver: zodResolver(editorOutSchema),
    mode: "onTouched",

    // What to use for initial data (must be RHF safe, i.e. no nulls etc)
    defaultValues: editorInSchema.parse(existingRecipeData),
  });

  const ingredientsArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  function saveRecipe(data: EditorOutSchema) {
    console.log("DB-ready data:", data);
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <form onSubmit={form.handleSubmit(saveRecipe)}>
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base">Recipe Editor</CardTitle>
          <CardDescription>
            Fill in the details, then save when you&apos;re ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-5">
            <FieldGroup className="gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Recipe Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g., Grandma's Apple Pie"
                    />
                    <FieldDescription>
                      Give your recipe a catchy title.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="A quick note about the recipe..."
                        className="min-h-[96px]"
                      />
                    </InputGroup>
                    <FieldDescription>
                      Optional. Keep it short so it fits nicely.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Controller
                  name="servings"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Servings</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        inputMode="numeric"
                        type="number"
                        min={1}
                        placeholder="e.g., 4"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="prepTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Prep (min)</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>min</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          inputMode="numeric"
                          type="number"
                          min={0}
                          placeholder="0"
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="cookTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Cook (min)</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <InputGroupText>min</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          inputMode="numeric"
                          type="number"
                          min={0}
                          placeholder="0"
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-7">
                <FieldSet className="gap-3">
                  <FieldLegend variant="label">Ingredients</FieldLegend>
                  <FieldDescription>
                    Add as many as you need. Empty rows are ignored.
                  </FieldDescription>

                  <FieldGroup className="gap-2">
                    {ingredientsArray.fields.map((row, index) => (
                      <div key={row.id} className="grid grid-cols-12 gap-2">
                        <Controller
                          name={`ingredients.${index}.name`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="col-span-12 md:col-span-6"
                            >
                              <FieldLabel
                                htmlFor={field.name}
                                className="sr-only"
                              >
                                Ingredient
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Ingredient"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name={`ingredients.${index}.quantity`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="col-span-6 md:col-span-3"
                            >
                              <FieldLabel
                                htmlFor={field.name}
                                className="sr-only"
                              >
                                Quantity
                              </FieldLabel>
                              <InputGroup>
                                <InputGroupAddon>
                                  <InputGroupText>Qty</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  inputMode="numeric"
                                  type="number"
                                  min={0}
                                  placeholder="0"
                                />
                              </InputGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name={`ingredients.${index}.unit`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="col-span-6 md:col-span-3"
                            >
                              <FieldLabel
                                htmlFor={field.name}
                                className="sr-only"
                              >
                                Unit
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Unit"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <div className="col-span-12 flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => ingredientsArray.remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          ingredientsArray.append({
                            name: "",
                            quantity: "",
                            unit: "",
                          })
                        }
                      >
                        Add Ingredient
                      </Button>
                    </div>
                  </FieldGroup>
                </FieldSet>
              </div>

              <div className="col-span-12 xl:col-span-5">
                <FieldSet className="gap-3">
                  <FieldLegend variant="label">Instructions</FieldLegend>
                  <FieldDescription>
                    Add steps in order. Empty steps are ignored.
                  </FieldDescription>

                  <FieldGroup className="gap-2">
                    {instructionsArray.fields.map((row, index) => (
                      <Controller
                        key={row.id}
                        name={`instructions.${index}`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="sr-only"
                            >
                              Step {index + 1}
                            </FieldLabel>
                            <InputGroup>
                              <InputGroupAddon>
                                <InputGroupText>{index + 1}</InputGroupText>
                              </InputGroupAddon>
                              <InputGroupTextarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Write a step..."
                                className="min-h-[56px]"
                              />
                              <InputGroupAddon align="inline-end">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    instructionsArray.remove(index)
                                  }
                                >
                                  Remove
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    ))}

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => instructionsArray.append("")}
                      >
                        Add Step
                      </Button>
                    </div>
                  </FieldGroup>
                </FieldSet>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 py-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Save Recipe</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
