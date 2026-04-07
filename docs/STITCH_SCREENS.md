# Google Stitch — screen titles, registry, cleanup

**Project ID:** `4201029456809424526` (InJourney Rinjani 2.0)

The Cursor Stitch MCP can **list**, **generate**, **edit**, and **variant** screens — it **cannot delete** screens. Remove clutter in the **Stitch web UI** (delete or archive, if available).

---

## Title convention (use when renaming in Stitch or in prompts)

Use a single line so sorting and search stay predictable:

```text
RITMS | <area> | <slug> | <kind> <label?> | <YYYYMMDD>
```


| Part         | Meaning                                             | Examples                               |
| ------------ | --------------------------------------------------- | -------------------------------------- |
| `RITMS`      | Product tag (Rinjani Integrated Talent Mgmt / HCMS) | fixed prefix                           |
| `<area>`     | Product area                                        | `auth`, `shell`, `talent`, `dashboard` |
| `<slug>`     | Flow or screen                                      | `login`, `reset-pw`, `home`            |
| `<kind>`     | Role of this canvas                                 | see below                              |
| `<label?>`   | Optional disambiguation                             | `warm`, `editorial`, `happy-path`      |
| `<YYYYMMDD>` | Last meaningful revision                            | `20260408`                             |


`**kind` keywords (pick one):**


| Kind    | Use when                                                                                  |
| ------- | ----------------------------------------------------------------------------------------- |
| `CANON` | Current source of truth for implementation / handoff (at most one active CANON per slug). |
| `VAR`   | Exploratory variant; label distinguishes branches, e.g. `VAR warm`, `VAR editorial`.      |
| `FORK`  | Branched experiment from a specific parent (note parent screen id in this doc).           |
| `WIP`   | Work in progress, not for handoff.                                                        |
| `DEP`   | Deprecated — safe to delete after you confirm replacement.                                |
| `ASSET` | Uploaded image/logo only — not an app screen.                                             |


**Examples**

- `RITMS | auth | login | CANON | 20260408`
- `RITMS | auth | login | VAR warm | 20260408`
- `RITMS | asset | logo | ASSET | 20260408`

When Stitch creates a **new** screen from edit/variant, paste the desired title into the prompt: *“Set the screen title exactly to: `…`.”*

---

## Registry (snapshot — update when canvas changes)

### Product decision — default login (implementation + Stitch parent)

**Use this screen as the baseline for code and for generating the next flows** (dashboard shell, post-login home, etc.):


| Screen ID                          | Title (Stitch)                                           | Note                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `757107747cec48599c75b3d9212b679c` | `RITMS | auth | login | CANON | warm-default | 20260407` | **Default landing / login** — warm accents, explicit `<img src>` hero (Indonesian coastal aerial), non-collapsing hero height, browser-ready HTML |


**Superseded CANON fork (hero panel often blank in preview — mark DEP):** `48dd375f45e04dd88d6db93dc4018fcd` (same title as above; replace with `757107747cec48599c75b3d9212b679c`).

**Prior warm variant (older broken hero):** `dff2957d19724df3a0c6b9c6d7c912ff` → **DEP**

### Auth — login & Microsoft edge cases (prototypes, 20260408)


| Screen ID                          | Title (Stitch)                                        | Note                                                                               |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `8166bc971a4b45fabf32f3ae5e97a01b` | `RITMS | auth | login | ERR | inline | 20260408`      | Client-side validation: invalid email, empty/short password, summary alert         |
| `223a4da6ef364755886b376e8e4637d1` | `RITMS | auth | login | ERR | credentials | 20260408` | Wrong password after submit; dismissible banner; remaining attempts                |
| `463a388e0c134126a232500de3e1fae9` | `RITMS | auth | login | LOCK | 20260408`              | Account locked; read-only email; disabled SSO row                                  |
| `0f4444b2fc2a4089b0959e1501cea230` | `RITMS | auth | microsoft | primary | 20260408`       | Microsoft SSO entry; corporate copy; back to email link                            |
| `2b97c9fd02c34765a0e7ae2da2f46d13` | `RITMS | auth | microsoft | ERR | 20260408`           | SSO failure; retry Microsoft, fall back to email/password, IT link, reference code |


### Keep — alternate login variants (reference only)


| Screen ID                          | Title (Stitch)                                    | Note                                                                                       |
| ---------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `e595f2b8d04c438ab1be1eb3289a8142` | `RITMS | auth | login | CANON | 20260408`         | Earlier fluid CANON without warm-default naming — **DEP** if you only track `warm-default` |
| `92dbaf58ade04c6984829b0caee5d22a` | `RITMS | auth | login | VAR editorial | 20260408` | Editorial variant                                                                          |


**Superseded by the above (mark `DEP`, then delete in Stitch):** `ddc616c2e2784d7797008aff0c069d01`, `21e6d737b9cf4e2c94b5f5201a74ddca`, `98b5fbcda62845c8888c71175ee523b8` (fixed 1920×1080 / pre-fluid).

### Keep — brand assets (do not delete)


| Screen ID              | Title                           |
| ---------------------- | ------------------------------- |
| `15470744207078025272` | Rinjani-logo (transparent).png  |
| `725955152463734912`   | Rinjani InJourney HCMS Logo.jpg |


### Deprecate — duplicate / superseded (delete in Stitch UI when ready)

Generic duplicates `**Login InJourney Rinjani 2.0`** (same title, old artboard sizes). Safe to remove once you rely on **CANON** above:

`7e47cd2a521f42dab2d799f76f478481`, `37ba8688ce5b4cb08aa23a10fce227d7`, `60c84e92250f4adfb0d5df4118b9c96f`, `ad002dbebcb14b64932193b2646247b9`, `7f23225ca133458293c4c1bc212ab4d0`, `2203cb5d45794e56bdb28f0947f7e2fa`, `9af2ff115ce5469a8cb322c09934a841`, `5c7e4416884440ca9659fab2ee8a80ef`, `e237e3cbe6be4ac4ad3988eafde17159`

**Superseded intermediate** (replaced by viewport + fluid pass):

- `63c98cf3301441fcbbef43e805b513c6` — pre–viewport-fix unified login → **DEP** after CANON is final
- `107ca2256c034c1c9decdc03d66ad27f`, `43f64c7b600e432e9ff8195c9716282b` — tall variant sources → **DEP** if v1/v2 replacements are enough

**Optional keep for history**

- `8aa3d0a49cdf4ab8b83155ce1bf6e292` — “Login — Default (Happy Path)” — mark `DEP` or `FORK` if unused

---

## Cleanup checklist

1. In Stitch, sort by **date** or search `**Login InJourney`**.
2. For each row in **Deprecate**, open → **Delete** (or your workspace equivalent).
3. Rename **Keep** rows to the **Title convention** above.
4. Update this file’s table when IDs change.

---

## Link to layout rules

Browser-ready HTML rules for Stitch prompts live in `**.stitch/DESIGN.md`** (*Stitch desktop viewport & browser-ready HTML*).

---

## Next Stitch prompts (handoff)

When generating **post-login** screens, reference the parent explicitly, for example:

- *“Continue from **RITMS auth login CANON warm-default** (`757107747cec48599c75b3d9212b679c`): same design tokens (Authority Teal `#006573`, Journey Orange `#F47C20`, Growth Green `#90BC40`), Plus Jakarta Sans, browser-ready HTML. After successful sign-in, show …”*

Implementation in the repo will diverge from Stitch HTML; treat the canvas as **visual + copy reference**, not drop-in code.

### Post-login (generated after warm-default CANON)


| Screen ID                          | Title (Stitch)                            | Note                                                                                                                                                         |
| ---------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ab30dcbd602844f29e86f2b912772471` | `RITMS | shell | home | CANON | 20260407` | **Beranda** after login — full shell, KPI row, two-column workspace. If browser preview feels tall, run a fluid `100dvh` pass via `edit_screens` like login. |


