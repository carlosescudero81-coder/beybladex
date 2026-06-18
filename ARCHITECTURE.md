# Spin Academy Architecture

## Beyblade X Academy Theme Layer

The app remains a static browser application with no build step. The Beyblade X adaptation is a presentation/data layer over the existing educational engine:

- `js/assets.js` centralizes `BEYBLADE_CHARACTERS`, `BEYBLADE_BEYS`, `BEYBLADE_STADIUMS`, individual image paths, and `X_TOWER_FLOORS`.
- `index.js` keeps the learning flows and adapts `renderMap()` into a 50-floor X Tower while preserving week-based curriculum state internally.
- `js/combat-session.js` keeps question generation and correction intact, but displays the active floor, stadium, rival, player Bey, and rival Bey.
- Required transparent PNG images are loaded individually from `assets/personajes/`, `assets/peonzas/`, `assets/estadios/`, and `assets/torre/torre_x_del_conocimiento.png` with visible fallbacks if they are missing.

The curriculum week remains the pedagogical unit; the X Tower floor is the child-facing progress layer.

## Current Shape

The app is still a static browser application with no build step. `index.html` loads scripts in this order:

1. `js/audio.js`
2. `js/assets.js`
3. `js/curriculum-data.js`
4. `js/learning-engine.js`
5. `js/services.js`
6. `js/combat-session.js`
7. `index.js`

This keeps compatibility with existing inline HTML handlers such as `onclick="app.showScreen('map')"`.

## Core Services

- `StorageService`: owns save/load, backup, reset, import, schema normalization, and legacy migration.
- `ProgressService`: owns explicit training/boss/review session keys, completion state, reward idempotency, and table statistics.
- `ParentalSecurityService`: owns PIN hashing, lockout, temporary parent sessions, and audit log entries.
- `CurriculumData`: owns subjects, skills, summer route, diagnostic blueprint, initial question bank, readings, offline missions, and data integrity validation.
- `LearningEngine`: owns learning profile normalization, daily mission selection, question selection, mixed weekly boss question selection, post-boss review planning, post-boss spaced review scheduling, spaced review streaks, overdue spaced review alerts, post-recovery notes, skill mastery, review queue scheduling, diagnostics, guided weekly planning, weak-skill recommendations, parent evidence reports, weekly boss readiness, and saved weekly boss summaries.
- `CombatSession`: owns battle flow and now receives the app controller through its constructor instead of reading the global `app`.
- `SoundFX`: owns synthesized browser audio and now receives an enabled-state callback instead of reading the app singleton directly.

These classes are exposed at `window.__SpinAcademyCore` so smoke tests and browser diagnostics can access the stable core without starting the full UI.

## Learning Surfaces

- Mathematics is delivered through the combat loop, using curriculum questions when a math mission is active.
- Weekly boss combat samples mixed curriculum questions from the active week's subjects.
- The initial diagnostic screen runs before the first map access and records baseline results in `pedagogy.learning.diagnostics`.
- Spanish Language uses the dedicated reading screen with story comprehension and short written response.
- English and Science/Social Knowledge use the reusable subject mission screen with quiz answers plus a short evidence response.
- Arte, Movement and family projects use the offline mission screen; completion is pending until a parent approves the evidence.
- The map includes a guided summer planner with the current week route and direct recommended actions.
- The weekly mission modal shows curriculum boss readiness from `LearningEngine.canUnlockWeeklyBoss()`.
- Boss victories create a saved weekly summary with proven subjects and skills that return to review.
- The guided planner can launch a post-boss review combat from the latest saved weak skills without advancing the summer route.
- Completing post-boss review schedules follow-up review items at 1, 3 and 7 days for skills that are not mastered.
- The map planner shows upcoming spaced reviews in a child-facing `spaced-review-strip`.
- The same strip shows a compact streak meter from `LearningEngine.getSpacedReviewStreak()`.
- The parent panel reads `LearningEngine.getSubjectSummary()` to show mastery across the active curriculum subjects.
- The parent panel reads `LearningEngine.getWeeklyEvidence()` to show weekly curriculum evidence, average accuracy, next step, and weak skills.
- The parent panel and exported report include the latest weekly boss summary when available.
- The parent panel and exported report include upcoming spaced review dates from `LearningEngine.getUpcomingSpacedReviews()`, and the report includes spaced review streak stats.
- The parent panel and exported report include overdue spaced review alerts from `LearningEngine.getSpacedReviewAlertSummary()`.
- Parent overdue alert cards can launch recovery review through `App.recoverOverdueSpacedReview()`.
- Post-recovery notes show cleared overdue skills and the remaining 1-3-7 dates in the parent panel and report.
- The parent panel reads `LearningEngine.getSummerTimeline()` to show progress across all 8 summer weeks.
- The parent panel reads `LearningEngine.getPendingOfflineEvidence()` to approve offline/project work.
- The parent panel can export a standalone weekly HTML report generated by `App.buildWeeklyFamilyReportHtml()`.

## Test Strategy

`npm test` runs `tests/core-smoke.test.cjs`, which loads the app scripts in browser order inside a Node `vm` with a minimal DOM, storage, and audio stub.
The smoke suite covers state normalization, progress advancement, reward idempotency, parental security, custom dialogs, and the `CombatSession` controller injection seam.
It also runs `tests/product-validation.test.cjs`, which validates script order, critical UI IDs, modal accessibility attributes, first-run child flow, diagnostic placement, guided planner rendering, child spaced review strip rendering, spaced review streak rendering, parent overdue spaced review alerts, parent recovery launch, post-recovery notes, post-boss review launch, spaced review report content, weekly boss readiness, mixed boss question generation, boss summary surfaces, parent gate access, parent weekly report export, parent summer timeline, offline approval, combat cleanup, reading missions, and English/Science subject missions.

`npm run check` runs syntax checks across every app script and the smoke test harness.

## Next Modularization Step

The safe next step is to move from classic global scripts to browser ES modules once inline HTML handlers are replaced with event bindings in `App.bindEvents()`.
