"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import FilePickerUploader from "@/components/FilePickerUploader";
import {
  EMPTY_RECIPE_EDITOR_VALUES,
  RecipeEditorInitialValues,
} from "@/lib/hookformSchema";
import {
  finalRecipeSchema,
  EditorFormState,
  FinalRecipeSchema,
} from "@/lib/finalRecipeSchema";
import { CategoryBrief } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const EMPTY_CATEGORY_VALUE = "__none__";

interface RecipeEditorProps {
  initialValues: RecipeEditorInitialValues;
  categories: CategoryBrief[];
  handleSave: (data: FinalRecipeSchema) => void | Promise<void>;
  handleCancel: () => void;
}

export function RecipeEditor({
  initialValues,
  categories,
  handleSave,
  handleCancel,
}: RecipeEditorProps) {
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const form = useForm<EditorFormState, unknown, FinalRecipeSchema>({
    // What to use to validate data during editing and on submit
    resolver: zodResolver(finalRecipeSchema),
    mode: "onTouched",

    // What to use for initial data (must be RHF safe, i.e. no nulls etc)
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const [imageUrl, imageKey, recipeName] = useWatch({
    control: form.control,
    name: ["imageUrl", "imageKey", "name"],
  });

  const ingredientsArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  async function saveRecipe(data: FinalRecipeSchema) {
    await handleSave(data);
  }

  function clearRecipeForm() {
    form.reset(EMPTY_RECIPE_EDITOR_VALUES);
    setIsClearDialogOpen(false);
  }

  return (
    <form onSubmit={form.handleSubmit(saveRecipe)}>
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Recipe Editor</CardTitle>
          <CardDescription>
            Complete and/or verify the recipe details below, then save to add
            the recipe to your cookbook.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <FieldGroup className="gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Recipe name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Grandma’s Apple Pie"
                      />
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
                          placeholder="A short summary of the dish, flavor, and occasion."
                          className="min-h-[96px]"
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="grid [grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))] gap-4">
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
                          step="any"
                          min={1}
                          placeholder="1"
                        />
                        <FieldDescription>
                          Number of portions this recipe produces.
                        </FieldDescription>
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
                        <FieldLabel htmlFor={field.name}>Prep</FieldLabel>
                        <InputGroup>
                          <InputGroupAddon>
                            <InputGroupText>min</InputGroupText>
                          </InputGroupAddon>
                          <InputGroupInput
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            inputMode="numeric"
                            type="number"
                            step="any"
                            min={0}
                            placeholder="0"
                          />
                        </InputGroup>
                        <FieldDescription>
                          Hands-on time (in minutes) before cooking begins.
                        </FieldDescription>
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
                        <FieldLabel htmlFor={field.name}>Cook</FieldLabel>
                        <InputGroup>
                          <InputGroupAddon>
                            <InputGroupText>min</InputGroupText>
                          </InputGroupAddon>
                          <InputGroupInput
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            inputMode="numeric"
                            type="number"
                            step="any"
                            min={0}
                            placeholder="0"
                          />
                        </InputGroup>
                        <FieldDescription>
                          Time (in minutes) the recipe spends actively cooking.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="categoryId"
                    control={form.control}
                    render={({ field, fieldState }) =>
                      (() => {
                        const selectedCategoryName = categories.find(
                          (cat) => String(cat.id) === String(field.value),
                        )?.name;

                        return (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                              Category
                            </FieldLabel>
                            <Select
                              value={
                                field.value === "" ? null : String(field.value)
                              }
                              onValueChange={(val) =>
                                field.onChange(
                                  !val || val === EMPTY_CATEGORY_VALUE
                                    ? ""
                                    : val,
                                )
                              }
                              disabled={!categories}
                            >
                              <SelectTrigger aria-invalid={fieldState.invalid}>
                                <SelectValue placeholder="Select…">
                                  {selectedCategoryName}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value={EMPTY_CATEGORY_VALUE}>
                                    Select…
                                  </SelectItem>
                                  {(categories ?? []).map((cat) => (
                                    <SelectItem
                                      key={cat.id}
                                      value={String(cat.id)}
                                    >
                                      {cat.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FieldDescription>
                              Select a category to place this recipe in.
                            </FieldDescription>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      })()
                    }
                  />
                </div>
              </FieldGroup>
            </div>

            <div className="min-w-0">
              <FieldSet className="gap-3">
                <FieldLegend variant="label">Ingredients</FieldLegend>
                <FieldDescription>
                  Add one ingredient per line. Blank rows will be ignored on
                  save.
                </FieldDescription>

                <FieldGroup className="gap-2">
                  {ingredientsArray.fields.map((row, index) => (
                    <div
                      key={row.id}
                      className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(4.75rem,5.5rem)_minmax(5.5rem,7rem)_auto] items-start gap-2"
                    >
                      <Controller
                        name={`ingredients.${index}.name`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
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
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="sr-only"
                            >
                              Quantity
                            </FieldLabel>
                            <InputGroup className="w-full">
                              <InputGroupAddon>
                                <InputGroupText>Qty</InputGroupText>
                              </InputGroupAddon>
                              <InputGroupInput
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                inputMode="numeric"
                                type="number"
                                step="any"
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
                          <Field data-invalid={fieldState.invalid}>
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

                      <div className="flex h-8 items-center justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          className="text-muted-foreground hover:bg-muted hover:text-destructive"
                          aria-label={`Remove ingredient ${index + 1}`}
                          onClick={() => ingredientsArray.remove(index)}
                        >
                          <TrashIcon weight="bold" />
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
                      Add ingredient
                    </Button>
                  </div>
                </FieldGroup>
              </FieldSet>
            </div>

            <div className="min-w-0 lg:col-span-2">
              <FieldSet className="gap-3">
                <FieldLegend variant="label">Instructions</FieldLegend>
                <FieldDescription>
                  List recipe instructions in order
                </FieldDescription>

                <FieldGroup className="gap-2">
                  {instructionsArray.fields.map((row, index) => (
                    <Controller
                      key={row.id}
                      name={`instructions.${index}.text`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name} className="sr-only">
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
                              placeholder="Describe the step"
                              className="min-h-[56px]"
                            />
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                aria-label={`Remove step ${index + 1}`}
                                className="text-muted-foreground hover:bg-transparent hover:text-destructive"
                                onClick={() => instructionsArray.remove(index)}
                              >
                                <TrashIcon weight="bold" />
                              </InputGroupButton>
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
                      onClick={() => instructionsArray.append({ text: "" })}
                    >
                      Add step
                    </Button>
                  </div>
                </FieldGroup>
              </FieldSet>
            </div>

            <div className="min-w-0 lg:col-span-2">
              <FieldSet className="gap-2">
                <FieldLegend variant="label">Recipe image</FieldLegend>
                <FieldDescription>
                  Upload a photo of the finished dish.
                </FieldDescription>

                <input type="hidden" {...form.register("imageUrl")} />
                <input type="hidden" {...form.register("imageKey")} />

                <FilePickerUploader
                  imageUrl={imageUrl || undefined}
                  imageAlt={recipeName || "Uploaded recipe image"}
                  onUploadingChange={setIsImageUploading}
                  onImageReady={({ imageUrl, imageKey }) => {
                    form.setValue("imageUrl", imageUrl, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    form.setValue("imageKey", imageKey, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                  onImageClear={() => {
                    if (!imageUrl && !imageKey) {
                      return;
                    }

                    form.setValue("imageUrl", "", {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    form.setValue("imageKey", "", {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              </FieldSet>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 py-4">
          <AlertDialog
            open={isClearDialogOpen}
            onOpenChange={setIsClearDialogOpen}
          >
            <AlertDialogTrigger
              render={
                <Button type="button" variant="destructive">
                  Clear
                </Button>
              }
            />
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <TrashIcon weight="bold" />
                </AlertDialogMedia>
                <AlertDialogTitle>Clear recipe form?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all unsaved changes from the editor and
                  restore the form to its starting values.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={clearRecipeForm}
                >
                  Clear form
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="border border-primary"
              disabled={isImageUploading}
            >
              {isImageUploading ? "Processing..." : "Save Recipe"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

export function RecipeEditorSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-4">
        <Skeleton className="h-5 w-28" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-3/4 max-w-lg" />
        </div>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-24 w-full" />
              </div>

              <div className="grid [grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))] gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-72 max-w-full" />
            <div className="space-y-2">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
            <Skeleton className="h-9 w-32" />
          </div>

          <div className="min-w-0 space-y-3 lg:col-span-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-14 w-full" />
              ))}
            </div>
            <Skeleton className="h-9 w-28" />
          </div>

          <div className="min-w-0 space-y-2 lg:col-span-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 py-4">
        <Skeleton className="h-10 w-20" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </CardFooter>
    </Card>
  );
}
