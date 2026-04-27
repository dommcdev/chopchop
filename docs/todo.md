## Project Tasks

### Todo
  - Ingredient scaling on recipe viewer


  - Right now categories in editor display id rather than name (in field)
  - Fix image lazy-to-eager rendering on dashboard recipe cards
  - Use actual nano-id for recipe ids
  - Add delete/rename button to categories
  - Add recipe editor skeleton for suspenses
  - uploadthing button helper suspense thing
  - make recipe viewer use card for consistency with editor
  - Add dialog confirm to editor form clear button


- Low Priority
  - Better new recipe button styling/positioning
  - `use cache` tsx rather than ts?
  - Search dialog - support category & incredient filters (ui bubbles + shortcut hints)
  - Upload recipe dialog
  - Pdf printing - finalize layout/styling
  - Tooltips (shadcn tooltip)
  - TOS/Privacy Policy pages
  - Display more data in each search result (category, trunc desc, etc)

### Future features (?)
- Redo landing page (more stuff)
- Bulk recipe json exporter/importer
- Bulk recipe ingest/queuing
- Rate limiting, private links
- Advanced search page
- Preferences
- Help page
- Add nutritional info, difficulty, rating
- Add sorting/groups to recipes page
- Infinite scroll with virtualization
- Food icons as image placeholders
- Change instruction order via dragable elements


### Behavior tweaks
- Tighten up schemas (min/max lengths, add category name schema, server double-validation, etc)
- Skeletons should be less detailed and not over-promise fields/cards
- Ability to create categories from edit page
- Add 'copy recipe to account' button

