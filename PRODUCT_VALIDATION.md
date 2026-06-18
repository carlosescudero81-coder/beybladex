# Product Validation

## Automated Checks

Run:

```bash
npm run check
npm test
```

Coverage:

- Static script order matches the browser load order.
- Beyblade X Academy branding, required local asset references, centralized character/Bey/stadium data, and 50-floor X Tower data exist.
- Critical UI IDs for child flow, combat, rewards, parent gate, and parent panel exist.
- Critical UI IDs for the diagnostic placement flow exist.
- Critical UI IDs for reading, English, and Medio missions exist.
- Critical UI IDs for offline missions and parent validation exist.
- Critical UI IDs for the guided planner and weekly parent report exist.
- Critical UI IDs for the child spaced review strip exist.
- Critical UI IDs for parent spaced review alerts exist.
- Critical UI IDs for weekly boss readiness exist.
- Critical UI IDs for weekly boss summaries exist.
- Critical UI IDs for exporting the weekly parent report exist.
- Critical UI IDs for the parent summer timeline exist.
- Parent gate and app dialog expose modal dialog attributes.
- Audio no longer reads the app singleton directly.
- Core smoke tests cover persistence, progress, diagnostic placement, offline approval, weekly boss readiness, weekly boss summaries, post-boss review planning, spaced review scheduling, spaced review streaks, overdue spaced review alerts, post-recovery notes, mixed boss question generation, rewards, parent PIN, dialogs, and combat injection.
- Product validation covers first-run child flow, avatar save, diagnostic completion, map mission availability, guided planner actions, child spaced review strip rendering, spaced review streak rendering, parent overdue spaced review alerts, parent recovery launch, post-recovery notes, post-boss review launch, spaced review report content, weekly boss readiness, mixed boss question generation, boss summary UI, offline evidence, parent approval, parent PIN gate, weekly parent report, weekly report export, parent summer timeline, combat cleanup on exit, reading completion, English completion, and Medio completion.

## Manual Browser Pass

Use this checklist before calling a release ready:

1. Start screen opens with the header hidden.
2. First click on "AL COMBATE" opens avatar creation.
3. Saving avatar opens the diagnostic placement flow.
4. Completing the diagnostic shows baseline result and then opens the map.
5. Week 1 mission modal opens; training is enabled and boss is disabled.
6. Completing enough trainings unlocks the boss.
7. Reward chest grants only one reward per completed session.
8. Parent panel requires PIN `2468` on a fresh profile.
9. Five wrong PIN attempts trigger temporary lockout.
10. Parent controls persist sound, difficulty, daily limit, export, import, and reset.
11. Combat exit returns to map and does not leave launch/physics timers active.
12. Lectura opens a story mission, requires comprehension answers and written response, then records progress.
13. Ingles opens a subject mission, records quiz answers, requires evidence, then updates mastery.
14. Medio opens a subject mission, records quiz/project answers, requires evidence, then updates mastery.
15. The map shows the current summer week, five daily curriculum cards, and a direct recommended action.
16. The parent panel shows baseline diagnostic result, weekly curriculum evidence, next step, and weak-skill reinforcement pills.
17. Offline family missions collect evidence from the child and remain pending until a parent approves them.
18. Parent approval completes the offline curriculum mission and updates the weekly route.
19. Parent panel exports a printable weekly HTML report.
20. Parent panel shows the full summer timeline across all curriculum weeks.
21. Weekly boss readiness shows mission completion, mastery and blocking reason before the boss can start.
22. Weekly boss questions sample the curriculum subjects from that week, not only math.
23. Weekly boss victory shows a subject/skill summary in the reward modal and parent report.
24. A weak boss summary creates a guided post-boss review action with targeted curriculum questions.
25. Completing post-boss review creates 1, 3 and 7 day spaced follow-up dates in the report.
26. The map shows upcoming 1-3-7 spaced reviews in a child-facing strip.
27. Completing a due spaced review updates the child-facing streak meter and report.
28. Parent panel shows overdue spaced review alerts with recovery context.
29. Parent overdue alert can launch the recovery review directly.
30. Parent panel and report show the latest recovery note with cleared skills and remaining dates.

## Release Notes

Phase 27 adds parent post-recovery notes with cleared skills and remaining spaced dates.
