// ── Categories ──────────────────────────────────────────────────────────────
Table categories {
  id integer [pk, increment]
  slug text [not null]
  user_id text [not null, note: 'Logical foreign key to Clerk']
  name text [not null]
  created_at text [not null, default: `current_timestamp`]
  updated_at text [not null, default: `current_timestamp`]
}

// ── Recipes ─────────────────────────────────────────────────────────────────
Table recipes {
  id integer [pk, increment]
  public_id text [not null, unique]
  slug text [not null]
  user_id text [not null, note: 'Logical foreign key to Clerk']
  name text [not null]
  description text
  servings integer [not null, default: 1]
  prep_time integer
  cook_time integer
  category_id integer
  image_url text
  image_key text
  created_at text [not null, default: `current_timestamp`]
  updated_at text [not null, default: `current_timestamp`]
}

// ── Ingredients ─────────────────────────────────────────────────────────────
Table ingredients {
  id integer [pk, increment]
  recipe_id integer [not null]
  name text [not null]
  quantity real
  unit text
}

// ── Instructions ────────────────────────────────────────────────────────────
Table instructions {
  id integer [pk, increment]
  recipe_id integer [not null]
  step_number integer [not null]
  text text [not null]
}

// ── Relationships ───────────────────────────────────────────────────────────

// One category has many recipes
Ref: categories.id < recipes.category_id

// One recipe has many ingredients
Ref: recipes.id < ingredients.recipe_id [delete: cascade]

// One recipe has many instructions
Ref: recipes.id < instructions.recipe_id [delete: cascade]

// Paste into dbdiagram.io
