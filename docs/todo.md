## Project Tasks

### Todo
- Search dialog
  * Styling (make it bigger)
  * Fix weird bug
  * Support category & incredient filters
  * Category/ingredient filter ui bubbles
  * UI hints
  * (Display more data in results??)

- Recipe editor
  * General layout (editable fields, draggable steps, etc)
  * Styling
  * Image selector for recipe image (reuse from recipe upload)
  * Create server action to take json input and update db
  * Call said server action (& refresh cache/ui/state/etc?)

- Home page
  * Add 3-dot dropdown on recipe cards with delete option (+ confirmation + actual deletion logic)

- Recipe viewer
  * Ingredient scaling

- `Add recipe` button
  * Add ui to navbar
  * Add file upload dialog (shadcn? uploadthing's?) with user hints (make sure native selector is in all files mode)
  * `Processing` ui while Gemini is working

- Categories
  * Add delete/rename ui to cards
  * Confirmation dialog if category contains recipes
  * Logic to edit those recipes to change category to `uncategorized`
  * Add create category ui

- PDF printing
  * Add QR code/short link
  * Finalize layout/styling

- Errors
  * Return error message objects on auth check failures (backend)
  * Make error toast message for ui

- TOS/Privacy Policy pages
- Better logo
- Full categories page (simple)
- Share icon copyies link to clipboard w/toast
- STYLING

- Optimizations & Tweaks
  * Cache categories, etc.
  * Make sure suspense boundaries etc are placed correctly
  * Loading spinners when needed

### Low Priority
- Bulk recipe json exporter
- More stuff on landing page

### Bugs

### Future features (?)
- [ ] Bulk recipe ingest/queuing
- [ ] Rate limiting, private links
- [ ] Advanced search page
- [ ] Preferences
- [ ] Nutritional info
- [ ] Dedicated recipes page with sorting
