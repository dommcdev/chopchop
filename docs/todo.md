## Project Tasks

### Todo
  - Add alert dialog to destructive actions (deleting category, recipe, etc)
  - Add 3-dot dropdown on recipe cards with delete option (+ confirmation + actual deletion logic)
  - Categories carousel button has weird click boundaries
  - Ingredient scaling on recipe viewer
  - Individual recipe-by-category pages
  - Swap sharelinkerror with dialog
  - Error.tsx page
  - On viewer page convert mins into hour+min
  - Investiate use cache more
  - Break back to dashboard test/icon into separate component

- Search dialog
  - Support category & incredient filters (ui bubbles)
  - UI hints
  - (Display more data in results??)

- Recipe editor
  - Need some kind of processing ui dialog (cc thinking words)
  - General layout (editable fields, draggable steps, etc)
  - Image selector for recipe image (use uploadthing's w/dragable zone)
  - Create server action to take json input and update db
  - Call said server action (& refresh cache/ui/state/etc?)

- Categories
  - Add delete/rename ui to cards (+ confirmation dialog)
  - Logic to edit those recipes to change category to `uncategorized`
  - Add create category ui

- Low Priority
  - Pdf printing - finalize layout/styling
  - Tooltips (shadcn tooltip)
  - TOS/Privacy Policy pages
  - Random food icons as image placeholders
  - Tighten up schema (min/max lengths, etc)

### Future features (?)
- Better error handling + help page
- More stuff on landing page
- Bulk recipe json exporter/importer
- Bulk recipe ingest/queuing
- Rate limiting, private links
- Advanced search page
- Preferences
- Add to schema: Nutritional info, difficulty, rating
- Add sorting/groups to recipes page
- Ability to create categories from edit page
- Infinite scroll with virtualization
