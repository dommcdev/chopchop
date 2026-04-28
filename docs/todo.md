## Project Tasks

### Todo
  - Right now categories in editor display id rather than name (in field)
  - Fix image lazy-to-eager rendering on dashboard recipe cards
  - Add delete/rename button to categories
  - Add recipe editor skeleton for suspenses
  - Better new recipe button styling/positioning
  - `use cache` tsx rather than ts?
  - TOS/Privacy Policy pages
  - Redo landing page (more stuff)
  - Tweak 3-dot-dropdown button + scaler modified/reset ui


- Low Priority
  - Search dialog - support category & incredient filters (ui bubbles + shortcut hints)
  - Upload recipe dialog
  - Pdf printing - finalize layout/styling
  - Tooltips (shadcn tooltip)
  - Display more data in each search result (category, trunc desc, etc)

### Future features (?)
- Bulk recipe json exporter/importer
- Bulk recipe ingest/queuing
- Rate limiting, private links
- Advanced search page
- Preferences
- Help page
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

