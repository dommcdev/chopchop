"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import FilePickerUploader from "@/components/FilePickerUploader";
import { RecipeEditorInitialValues } from "@/lib/hookformSchema";
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
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

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

  return (
    <form onSubmit={form.handleSubmit(saveRecipe)}>
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base">Recipe Editor</CardTitle>
          <CardDescription>
            Complete the recipe details below, then save when everything is
            ready to publish.
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
                        placeholder="e.g. Grandma’s apple pie"
                      />
                      <FieldDescription>
                        Choose a clear title people will recognize at a glance.
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
                          placeholder="A short summary of the dish, flavor, and occasion."
                          className="min-h-[96px]"
                        />
                      </InputGroup>
                      <FieldDescription>
                        Summarize the dish in one or two concise sentences.
                      </FieldDescription>
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
                          placeholder="4"
                        />
                        <FieldDescription>
                          Number of portions this recipe makes.
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
                          Hands-on time before cooking begins.
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
                          Time the recipe spends actively cooking.
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
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                        <Select
                          value={
                            field.value === "" ? null : String(field.value)
                          }
                          onValueChange={(val) => field.onChange(val ?? "")}
                          disabled={!categories}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select…" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {(categories ?? []).map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FieldDescription>
                          Select the section this recipe belongs in.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </div>

            <div className="min-w-0 lg:row-span-2">
              <FieldSet className="gap-3">
                <FieldLegend variant="label">Ingredients</FieldLegend>
                <FieldDescription>
                  Add one ingredient per line. Blank rows will be ignored when
                  you save.
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
                  List the method in order, with each step kept short and
                  actionable.
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
                              placeholder="Describe the step…"
                              className="min-h-[56px]"
                            />
                            <InputGroupAddon align="inline-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => instructionsArray.remove(index)}
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
                      onClick={() => instructionsArray.append({ text: "" })}
                    >
                      Add step
                    </Button>
                  </div>
                </FieldGroup>
              </FieldSet>
            </div>

            <div className="min-w-0 lg:col-start-1 lg:row-start-2">
              <FieldSet className="gap-3">
                <FieldLegend variant="label">Recipe image</FieldLegend>
                <FieldDescription>
                  Upload a clean, well-lit photo so the finished recipe is easy
                  to identify.
                </FieldDescription>

                <input type="hidden" {...form.register("imageUrl")} />
                <input type="hidden" {...form.register("imageKey")} />

                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel>Image</FieldLabel>
                    <FilePickerUploader
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
                    />
                    <FieldDescription>
                      Landscape or square images usually frame best in cards and
                      lists.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 py-4">
          <Button
            type="button"
            variant="outline"
            className="border border-primary"
            onClick={() => form.reset()}
          >
            Clear
          </Button>
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
