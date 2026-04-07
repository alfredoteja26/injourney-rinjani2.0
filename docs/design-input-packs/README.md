# Design Input Pack exports (workspace drop zone)

This tree is where **Notion (or other) exports** land so **design iterations in Cursor** can load product context without hunting the workspace.

**Canonical spec:** [`../NOTION_DESIGN_INPUT_PACK_SKILL.md`](../NOTION_DESIGN_INPUT_PACK_SKILL.md) — Pack Section order, scope rules, samples.

---

## Folder map (product lines)

| Folder | Rinjani / repo anchor | Put here |
|--------|------------------------|----------|
| [`performance/`](./performance/) | `packages/performance` — engineering performance | DIPs and supporting notes for that product line |
| [`talent/`](./talent/) | `packages/talent` — talent / IDP / career journeys | DIPs and supporting notes |
| [`portal/`](./portal/) | `packages/portal` — portal shell / entry experience | DIPs and supporting notes |

Each product folder has an **`exports/`** subfolder: save **Markdown** DIPs there unless you deliberately split artifacts (see below).

---

## File naming (recommended)

Use predictable names so humans and agents can find the latest slice:

- `dip-<slice-or-epic>-v<major.minor>.md`  
  Examples: `dip-idp-employee-submit-v0.1.md`, `dip-portal-home-v0.1.md`

Optional sidecars in the same `exports/` folder:

- `schema-<topic>.md` — legacy DB / ERD notes you do not want inside the main DIP  
- `glossary-<topic>.md` — terms only if too large for Pack Section 8  
- `PROCESSING.md` — your own scratchpad (optional; agents may still read it if you ask)

---

## What the AI (Cursor) needs from you

When you start a **design iteration** (Stitch, UI review, or implementation aligned to a DIP), **point the session** at:

1. **The active DIP file** under the right `exports/` folder (path + filename).  
2. **Optional:** any repo fixture path you reference in Pack Section 4 (e.g. `packages/talent/src/data/idpData.ts`).  
3. **Optional:** `.stitch/DESIGN.md` or design-system docs if the task is visual-consistency-heavy.

**Minimum viable context for a strong iteration**

- One **complete** DIP Markdown file (all Pack Sections 0–9 filled for that slice, or explicitly `[TBD]`).  
- Pack Sections **3 and 4** consistent (IDs and relationships match).  
- Slice scope matches **one journey or actor goal** (see skill guide — avoid whole-module mega-files).

**Nice to add in chat**

- “Implement / design only what’s in `docs/design-input-packs/talent/exports/dip-….md`.”  
- “Ignore other DIPs in that folder unless I say so.”

---

## What you should not rely on

- Empty `exports/` folders carry **no** product context until you add files.  
- Agents do **not** automatically read this tree; **@ mention** the file or paste the path in your prompt.

---

## Shared template

Copy [`dip-TEMPLATE.md`](./dip-TEMPLATE.md) when starting a new slice, then save the filled copy under the correct `*/exports/` folder.
