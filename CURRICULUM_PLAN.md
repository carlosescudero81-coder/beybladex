# Curriculum Plan

## X Tower Mapping

The 8-week curriculum remains the educational source of truth. The child-facing Beyblade X layer maps that route into `X_TOWER_FLOORS`:

- Week 1 -> floors 1-6
- Week 2 -> floors 7-12
- Week 3 -> floors 13-18
- Week 4 -> floors 19-25
- Week 5 -> floors 26-31
- Week 6 -> floors 32-37
- Week 7 -> floors 38-44
- Week 8 -> floors 45-50

Daily missions become floor challenges, weekly bosses become ascension/tower rivals, and 1-3-7 reviews are presented as recalibrations while keeping the same spaced-review logic.

## Phase 8 Scope

Phase 8 adds the first real curriculum layer for the summer learning path. The source of truth is `js/curriculum-data.js`.

It defines:

- 6 learning subjects: Mathematics, Spanish Language, English, Science/Social Knowledge, Arts, and Movement/Habits.
- Skill maps for the bridge from 2nd to 3rd grade.
- An 8-week summer route with 5 daily missions per week.
- Diagnostic blueprint for the initial placement activity.
- Initial question bank, reading bank, and offline family missions.
- A built-in `CurriculumData.validate()` integrity check.

## Pedagogical Shape

The route follows the dossier:

- Weeks 1-2: consolidate 2nd grade bases: reading, numeration, addition/subtraction, simple problems.
- Weeks 3-4: build multiplication from groups and grids before speed practice.
- Week 5: science, English vocabulary, health, and short physical habits.
- Week 6: 9999 numeration, sharing/division intro, measures and money.
- Week 7: history/time, geometry/data, creativity and movement.
- Week 8: mixed final tournament and accumulated review.

## Phase 9 Scope

Phase 9 adds `js/learning-engine.js`, the first executable layer on top of `CurriculumData`.

It provides:

- `LearningEngine.normalizeProfile()` for saved progress migration.
- `LearningEngine.getCurrentMission()` for the active summer mission.
- `LearningEngine.selectQuestionsForMission()` for fresh questions plus due reviews.
- `LearningEngine.recordAnswer()` for mastery, streaks and error tracking.
- `LearningEngine.reviewQueue` scheduling with 0, 1, 3 and 7 day review steps.
- `LearningEngine.recordMissionCompletion()` for advancing the 8-week route.
- `LearningEngine.canUnlockWeeklyBoss()` for weekly readiness checks.

The persisted state now includes `pedagogy.learning`, normalized by `StorageService`.

## Phase 10 Scope

Phase 10 wires Mathematics into the existing combat loop:

- `App.getCurriculumMissionForCombat()` chooses the active math mission or the next math mission in the summer route.
- `CombatSession.generateQuestionsList()` uses `LearningEngine.selectQuestionsForMission()` when a math curriculum mission is available.
- Curriculum questions are adapted to the existing battle format.
- Each math answer is recorded with `LearningEngine.recordAnswer()`.
- Winning a battle records either a curriculum mission completion or a practice-only session.
- The parent panel shows math mastery percentage, mastered skill count, and due review items.

The legacy table generator remains as fallback for sessions without curriculum questions.

## Phase 11 Scope

Phase 11 adds the first dedicated Language screen:

- `screen-language` renders the Biblioteca de Historias.
- The header includes direct access through `Lectura`.
- The app selects the active language mission or the next language mission in the summer route.
- Reading texts come from `CurriculumData.readingBank`.
- Literal and inference questions are answered in the UI and recorded with `LearningEngine.recordAnswer()`.
- A short written response is required before completing the mission.
- Completed reading missions grant 10 coins and 20 XP.
- The parent panel now shows Language mastery and mastered language skills.

## Phase 12 Scope

Phase 12 expands the curriculum beyond Math and Language:

- The header now includes direct access to `Ingles` and `Medio`.
- `screen-subject` provides a reusable mission surface for English and Conocimiento del Medio.
- English missions use focused vocabulary, dialogue and translation-style questions.
- Science/Social Knowledge missions use quiz and project-style evidence prompts.
- The question bank now includes additional English and Science/Social Knowledge items.
- Each answer is recorded with `LearningEngine.recordAnswer()`.
- Completing a subject mission requires all questions plus a short written evidence response.
- Completed subject missions grant 8 coins and 18 XP.
- The parent panel now shows mastery for Math, Language, English and Medio.
- Product validation covers both new subject flows.

## Phase 13 Scope

Phase 13 turns the dossier into a guided summer planner:

- `LearningEngine.getWeekPlan()` exposes the active five-day curriculum route.
- `LearningEngine.getDailyRecommendations()` chooses the next useful action: review, mission or reinforcement.
- `LearningEngine.getWeakSkillRecommendations()` ranks weak skills using due reviews, mastery, errors and missing practice.
- `LearningEngine.getWeeklyEvidence()` builds a parent-facing weekly report with completed missions, average accuracy, evidence text and next step.
- The map now shows a compact agenda with the current week, five daily curriculum cards and direct action buttons.
- Daily mission modals now display curriculum subject, skill, mission type and weekly focus instead of generic speed-only text.
- Reading, English and Medio evidence text is stored in mission history.
- The parent panel now includes a weekly curriculum report and reinforcement pills.
- Automated tests cover planner methods, critical planner UI IDs and parent report rendering.

## Phase 14 Scope

Phase 14 adds the initial diagnostic placement flow:

- `LearningEngine.selectDiagnosticQuestions()` builds a short baseline quiz from the diagnostic blueprint.
- `LearningEngine.isDiagnosticComplete()` gates the first access to the summer map.
- `LearningEngine.completeDiagnostic()` calculates baseline score, recommended skills and suggested starting week.
- `LearningEngine.getDiagnosticSummary()` exposes the result for UI and parent reporting.
- The app now routes first-time players from avatar creation to `screen-diagnostic` before the map.
- Diagnostic answers update skill mastery and mark weak skills as recommended for reinforcement.
- The planner recommends the diagnostic first if it has not been completed.
- The parent weekly report includes the initial baseline score and suggested starting week.
- Automated tests cover diagnostic selection, completion, first-run routing and diagnostic UI IDs.

## Phase 15 Scope

Phase 15 adds parent-approved offline and family project validation:

- `LearningEngine.submitOfflineEvidence()` stores a child's written evidence as pending.
- `LearningEngine.getPendingOfflineEvidence()` exposes pending family validations.
- `LearningEngine.approveOfflineEvidence()` records approval, updates mastery and completes the curriculum mission.
- The app now includes `screen-offline` for Arte, Movimiento and family projects in Medio.
- The planner opens offline/project missions directly when the current recommendation is outside the screen.
- The parent panel now lists pending family validations and lets an active parent session approve them.
- Approved offline missions grant rewards and count toward the same weekly route as combat, reading and quiz missions.
- Automated tests cover offline evidence submission, parent approval and mission history completion.

## Phase 16 Scope

Phase 16 adds the printable/exportable weekly family report:

- The parent panel now includes `Descargar informe semanal`.
- `App.buildWeeklyFamilyReportHtml()` generates a standalone HTML report from the current local progress.
- The report includes the child name, date, diagnostic score, suggested starting week, current week, weekly focus, progress by subject, written evidence, weak-skill recommendations, pending family validations and next step.
- `App.exportWeeklyFamilyReport()` downloads the report as an `.html` file that can be opened or printed by parents.
- Report text is escaped before insertion into the generated HTML.
- Automated tests cover the export button, report generation and escaping of child-provided text.

## Phase 17 Scope

Phase 17 adds the parent dashboard timeline across the whole summer:

- `LearningEngine.getSummerTimeline()` summarizes all 8 curriculum weeks.
- Each week summary includes status, completed missions, total missions, average accuracy, evidence count, pending family validations and subjects worked.
- The parent panel now includes `Linea Temporal del Verano`.
- The timeline highlights completed, current, next and pending weeks.
- The exported weekly report now includes the full summer timeline table.
- Automated tests cover the timeline API, parent timeline UI and report export content.

## Phase 18 Scope

Phase 18 connects the weekly boss to real curriculum readiness:

- `LearningEngine.canUnlockWeeklyBoss()` now returns a full readiness report.
- The report includes completed mission count, mastery average, boss name, week focus, daily completion state and weak skills.
- The weekly mission modal now includes a `Preparacion del jefe semanal` panel.
- The boss button is enabled only when the curriculum gate is ready.
- Direct boss starts are blocked with a clear reason when the route is not ready.
- Automated tests cover readiness details and the boss readiness UI.

## Phase 19 Scope

Phase 19 makes the weekly boss a mixed curriculum challenge:

- `LearningEngine.selectQuestionsForWeeklyBoss()` samples questions from the week's skills and subjects.
- Boss combat now generates `curriculum-boss` questions before falling back to legacy math questions.
- Boss questions can include Math, Language, English and Science depending on the current week.
- Each boss answer still updates the corresponding curriculum skill through `LearningEngine.recordAnswer()`.
- Pedagogical feedback now handles generic curriculum boss questions.
- Automated tests cover mixed boss question selection and combat question generation.

## Phase 20 Scope

Phase 20 adds end-of-week boss summaries:

- `LearningEngine.recordWeeklyBossSummary()` stores a durable summary after a weekly boss win.
- The summary explains which subjects were proven in the boss and which skills should return to the review cycle.
- `LearningEngine.getWeeklyBossSummary()` and `getBossSummaries()` expose saved boss evidence for UI and reports.
- Boss combat records a curriculum answer log by subject and skill, then creates the summary on victory.
- The reward modal shows a compact boss acta before the chest is opened.
- The parent panel and printable weekly report now include the boss summary.
- Automated tests cover summary generation, required UI IDs and report export content.

## Phase 21 Scope

Phase 21 turns boss summaries into targeted post-boss review sessions:

- `LearningEngine.getPostBossReviewPlan()` finds the latest boss summary with weak skills.
- `LearningEngine.selectQuestionsForPostBossReview()` builds a question set strictly from those weak skills.
- `LearningEngine.recordPostBossReviewCompletion()` stores completion without advancing the summer route.
- `ProgressService` now has a `post-boss-review` session type that is rewardable but does not move the week/day cursor.
- The guided summer planner surfaces `Repaso del jefe semanal` as a direct action after diagnostic completion.
- `CombatSession` supports `curriculum-review` questions for post-boss review battles.
- Automated tests cover review plan generation, question targeting, combat launch and completion.

## Phase 22 Scope

Phase 22 connects post-boss reviews to spaced follow-up dates:

- `LearningEngine.schedulePostBossSpacedReviews()` creates 1, 3 and 7 day follow-up dates after a post-boss review.
- The schedule is stored in `spacedReviewPlans` and mirrored into the existing `reviewQueue`.
- Spaced items are tagged with `source: post_boss_spaced`, week, skill and due date.
- `LearningEngine.getUpcomingSpacedReviews()` exposes the calendar for parent UI and reports.
- The parent boss summary now lists the next 1-3-7 review dates.
- The printable family report includes a `Calendario de repeticion espaciada` section.
- Automated tests cover date generation, queue insertion and report export content.

## Phase 23 Scope

Phase 23 adds a child-facing spaced review badge to the map:

- The map planner now includes `spaced-review-strip` below the weekly route.
- `App.renderSpacedReviewStrip()` reads `LearningEngine.getUpcomingSpacedReviews()` and shows the next review dates.
- Due reviews are highlighted as ready and expose a `Repasar ahora` button.
- Future reviews show as `Programado` so the child can see what is coming without starting too early.
- The strip stays hidden when there are no spaced reviews.
- Automated tests cover the critical UI ID and planner rendering after a 1-3-7 schedule exists.

## Phase 24 Scope

Phase 24 adds a consistency meter for spaced reviews:

- `LearningEngine.spacedReviewStreak` tracks current streak, best streak, on-time completions and last completion date.
- `LearningEngine.recordSpacedReviewStreak()` increments the streak only when a due spaced review is completed on time.
- Completing a due spaced review removes that due item from the queue while preserving the original 1-3-7 schedule.
- `LearningEngine.getSpacedReviewStreak()` exposes the metric for UI and reports.
- The map `spaced-review-strip` now includes a compact racha meter for the child.
- The printable weekly report includes current streak, best streak and total on-time spaced reviews.
- Automated tests cover due-review completion, streak updates and report content.

## Phase 25 Scope

Phase 25 adds parent-visible alerts for overdue spaced reviews:

- `LearningEngine.getOverdueSpacedReviews()` returns spaced review items whose due date is already past.
- `LearningEngine.getSpacedReviewAlertSummary()` groups overdue items by skill and keeps streak context.
- The parent panel now includes `Alertas de Repaso Espaciado`.
- `App.renderParentSpacedAlerts()` shows either a clear state or an overdue recovery plan.
- Alerts explain that the goal is to recover with a short session without erasing streak context.
- The printable weekly report includes an `Alertas parentales` section.
- Automated tests cover overdue detection, alert UI and report content.

## Phase 26 Scope

Phase 26 adds one-click parent recovery for overdue spaced reviews:

- `LearningEngine.getSpacedReviewAlertSummary()` now includes `recoveryWeek` from the oldest overdue spaced item.
- The parent alert card includes a `Lanzar repaso de recuperacion` button.
- `App.recoverOverdueSpacedReview()` requires an active parent session before launching recovery.
- Recovery starts the existing `post-boss-review` combat for the overdue week.
- Product tests cover the recovery action opening `curriculum-review` combat.

## Phase 27 Scope

Phase 27 adds a parent post-recovery note:

- `LearningEngine.spacedRecoveryNotes` stores recent recovery notes.
- Completing an overdue spaced review records cleared skills, cleared count, racha context and remaining scheduled dates.
- `LearningEngine.getLatestSpacedRecoveryNote()` exposes the latest note for UI and reports.
- `App.renderParentSpacedAlerts()` shows `Ultima recuperacion completada` after a recovery, even if other dates remain overdue.
- The printable weekly report includes `Ultima recuperacion` and the dates still programmed.
- Automated tests cover note creation, parent UI and report content.

## Next Implementation Step

Phase 28 should add a small child-facing completion message after recovery that reinforces "volviste al calendario" without exposing parent-only details.
