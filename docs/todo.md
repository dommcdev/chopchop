## Project Tasks

### Todo
  - Fix image lazy-to-eager rendering on dashboard recipe cards
  - Add delete/rename button to categories
  - Add recipe editor skeleton for suspenses
  - `use cache` tsx rather than ts?
  - TOS/Privacy Policy pages
  - Redo landing page (more stuff)


- Low Priority
  - Search dialog - support category & incredient filters (ui bubbles + shortcut hints)
  - Upload recipe dialog
  - Pdf printing - finalize layout/styling
  - Display more data in each search result (category, trunc desc, etc)
  - Bulk recipe json exporter/importer

### Future features (?)
- Advanced search page
- Help page (+ tooltips)
- Add nutritional info, difficulty, rating, og source
- Add sorting/groups to recipes page
- Infinite scroll with virtualization
- Food icons as image placeholders
- Change instruction order via dragable elements
- Welcome flow (default categories + example recipes)


### Behavior tweaks
- Tighten up schemas (min/max lengths, add category name schema, server double-validation, etc)
- Skeletons should be less detailed and not over-promise fields/cards
- Ability to create categories from edit page
- Add 'copy recipe to account' button
- Add uncategoried category
- Auto-convert units with scaling (+ detect nums in instructions to warn user)
- Rate limiting
- Recipes private-by-default

