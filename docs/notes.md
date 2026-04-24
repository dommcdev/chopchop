## URLs
Each recipe page will have a normal human-friendly slug url and also a rename-resistant sharing one.

E.g.
/dashboard/r/grandmas-lasagna
as well as the equivalent
/dashboard/s/3jfkdl2d




## Data Flow & Types

### New Recipe Flow
1. User uploads a file.
2. geminiAnalyzeRecipe returns GeminiRecipeSchema.
3. UploadRecipeButton calls geminiToRecipeEditorInitialValues(...).
4. Inside that mapper:
   - Gemini shape is translated into editor shape
   - hookformSchema.parse(...) normalizes values for RHF
5. The zustand store saves draft: RecipeEditorInitialValues.
6. NewRecipeClient reads that draft, or falls back to EMPTY_RECIPE_EDITOR_VALUES.
7. RecipeEditor receives initialValues: RecipeEditorInitialValues.
8. useForm<EditorFormState, unknown, FinalRecipeSchema> uses those as defaultValues.
9. On submit, RHF + finalRecipeSchema produce FinalRecipeSchema.

Type path:
- GeminiRecipeSchema
- RecipeEditorInitialValues
- EditorFormState
- FinalRecipeSchema

### Edit Existing Recipe Flow
1. Page fetches recipe from DB with fetchRecipeBlob(...).
2. That returns RecipeBlob.
3. EditRecipeClient calls recipeBlobToRecipeEditorInitialValues(...).
4. Inside that mapper:
   - DB read shape is flattened into editor shape
   - hookformSchema.parse(...) normalizes values for RHF
5. RecipeEditor receives initialValues: RecipeEditorInitialValues.
6. RHF uses those defaults.
7. On submit, finalRecipeSchema produces FinalRecipeSchema.

Type path:
- RecipeBlob
- RecipeEditorInitialValues
- EditorFormState
- FinalRecipeSchema


### Manual Empty Recipe Flow
1. NewRecipeClient has no draft in store.
2. It uses EMPTY_RECIPE_EDITOR_VALUES.
3. RecipeEditor receives initialValues: RecipeEditorInitialValues.
4. Submit still becomes FinalRecipeSchema.

Type path:
- EMPTY_RECIPE_EDITOR_VALUES
- RecipeEditorInitialValues
- EditorFormState
- FinalRecipeSchema


What each type means
- GeminiRecipeSchema: raw AI boundary output
- RecipeBlob: raw DB read shape
- RecipeEditorInitialValues: canonical editor input/default-values shape
- EditorFormState: RHF input-side type for the form
- FinalRecipeSchema: validated submit / DB-write-ready shape
