const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const scriptFiles = [
  'js/audio.js',
  'js/assets.js',
  'js/curriculum-data.js',
  'js/learning-engine.js',
  'js/services.js',
  'js/combat-session.js',
  'index.js'
];
const source = scriptFiles
  .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n\n');

function createDomStub() {
  const elements = new Map();
  const documentStub = {
    activeElement: null,
    body: {
      appendChild() {}
    },
    addEventListener() {},
    removeEventListener() {},
    createElement(tagName) {
      return createElement(`${tagName}-${elements.size}`);
    },
    getElementById(id) {
      return createElement(id);
    },
    querySelector() {
      return createElement(`query-${elements.size}`);
    },
    querySelectorAll() {
      return [];
    }
  };

  function createElement(id) {
    if (!elements.has(id)) {
      const element = {
        id,
        style: {},
        className: '',
        innerText: '',
        innerHTML: '',
        textContent: '',
        value: '',
        checked: false,
        onclick: null,
        onkeydown: null,
        offsetWidth: 1,
        classList: {
          add() {},
          remove() {},
          toggle() {}
        },
        appendChild() {},
        remove() {},
        focus() {
          documentStub.activeElement = element;
        },
        click() {
          if (typeof element.onclick === 'function') element.onclick();
        },
        setAttribute() {},
        removeAttribute() {},
        querySelector() {
          return createElement(`${id}-child`);
        },
        querySelectorAll() {
          return [];
        }
      };
      elements.set(id, element);
    }
    return elements.get(id);
  }

  documentStub.activeElement = createElement('initial-focus');
  return documentStub;
}

function createLocalStorageStub() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    }
  };
}

function AudioContextStub() {
  const audioParam = {
    setValueAtTime() {},
    exponentialRampToValueAtTime() {},
    linearRampToValueAtTime() {}
  };
  this.state = 'running';
  this.currentTime = 0;
  this.destination = {};
  this.resume = () => {};
  this.createOscillator = () => ({
    type: 'sine',
    frequency: audioParam,
    connect() {},
    start() {},
    stop() {}
  });
  this.createGain = () => ({
    gain: audioParam,
    connect() {}
  });
}

async function run() {
  const documentStub = createDomStub();
  const context = {
    assert,
    console,
    localStorage: createLocalStorageStub(),
    document: documentStub,
    window: {
      AudioContext: AudioContextStub,
      webkitAudioContext: AudioContextStub
    },
    Blob: class BlobStub {
      constructor(parts, options) {
        this.parts = parts;
        this.options = options;
      }
    },
    URL: {
      createObjectURL() {
        return 'blob:spin-academy-test';
      },
      revokeObjectURL() {}
    },
    FileReader: class FileReaderStub {},
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Date,
    Math,
    Promise
  };
  context.window.window = context.window;
  context.window.document = documentStub;
  context.window.localStorage = context.localStorage;

  const testSource = `${source}

(async () => {
  assert.ok(window.__SpinAcademyCore.StorageService, 'core services are exported for tests');
  assert.ok(window.__SpinAcademyCore.CurriculumData, 'curriculum data is exported for tests');
  assert.ok(window.__SpinAcademyCore.LearningEngine, 'learning engine is exported for tests');

  const curriculumValidation = CurriculumData.validate();
  assert.equal(curriculumValidation.ok, true, curriculumValidation.errors.join('; '));
  assert.equal(Object.keys(CurriculumData.subjects).length, 6);
  assert.equal(CurriculumData.summerWeeks.length, 8);
  assert.ok(CurriculumData.questionBank.length >= 500);
  assert.ok(CurriculumData.readingBank.length >= 2);
  assert.ok(CurriculumData.getSkill('math_multiply_fast'));
  assert.ok(CurriculumData.getQuestionsBySkill('math_multiply_fast').length >= 1);
  CurriculumData.getAllSkills().forEach(skill => {
    assert.ok(CurriculumData.getQuestionsBySkill(skill.id).length >= 3, skill.id + ' should have enough practice questions');
  });

  const legacy = StorageService.normalizeState({
    player: {
      name: '  Carla  ',
      coins: '-20',
      xp: '9',
      currentWeek: 99,
      currentDay: -2
    },
    inventory: {
      core: ['core_aqua', 'core_aqua'],
      ring: [],
      driver: [],
      color: []
    },
    pedagogy: {
      math: {
        timeSpentSeconds: '30',
        correctAnswers: '4',
        incorrectAnswers: '1',
        dailyStats: []
      }
    },
    config: {
      parentalSecurity: {}
    }
  });
  assert.equal(legacy.schemaVersion, StorageService.VERSION);
  assert.equal(legacy.player.name, 'Carla');
  assert.equal(legacy.player.coins, 0);
  assert.equal(legacy.player.currentWeek, 12);
  assert.equal(legacy.player.currentDay, 1);
  assert.deepEqual(legacy.inventory.core, ['core_wood', 'core_aqua']);
  assert.ok(legacy.pedagogy.math.dailyStats[StorageService.todayKey()]);
  assert.ok(legacy.pedagogy.learning.skills.math_number_999);
  assert.equal(legacy.pedagogy.learning.currentWeek, 1);
  assert.equal(ParentalSecurityService.verifyPin(legacy, '2468').ok, true);

  const diagnosticState = StorageService.normalizeState(null);
  assert.equal(LearningEngine.isDiagnosticComplete(diagnosticState), false);
  const diagnosticQuestions = LearningEngine.selectDiagnosticQuestions(diagnosticState);
  assert.ok(diagnosticQuestions.length >= 5);
  diagnosticQuestions.forEach((question, index) => {
    LearningEngine.recordAnswer(diagnosticState, question, index % 2 === 0, { diagnostic: true });
  });
  const diagnostic = LearningEngine.completeDiagnostic(diagnosticState);
  assert.ok(diagnostic.completedAt);
  assert.equal(typeof diagnostic.baselineScore, 'number');
  assert.equal(LearningEngine.isDiagnosticComplete(diagnosticState), true);
  const diagnosticSummary = LearningEngine.getDiagnosticSummary(diagnosticState);
  assert.ok(diagnosticSummary.results.some(result => result.attempts > 0));

  const learningState = StorageService.normalizeState(null);
  const currentMission = LearningEngine.getCurrentMission(learningState);
  assert.equal(currentMission.week, 1);
  assert.equal(currentMission.day, 1);
  assert.equal(currentMission.subject.id, 'language');
  const firstQuestions = LearningEngine.selectQuestionsForMission(learningState, currentMission, 3);
  assert.ok(Array.isArray(firstQuestions));
  assert.equal(Object.keys(learningState.pedagogy.learning.questionHistory).length, 0);
  const firstMissionQuestion = firstQuestions[0];
  LearningEngine.recordAnswer(learningState, firstMissionQuestion, true);
  assert.equal(learningState.pedagogy.learning.questionHistory[firstMissionQuestion.id].attempts, 1);
  assert.equal(learningState.pedagogy.learning.questionHistory[firstMissionQuestion.id].lastResult, 'correct');
  const missionAfterSeen = LearningEngine.selectQuestionsForMission(learningState, currentMission, 2);
  assert.ok(
    !missionAfterSeen.some(question => question.id === firstMissionQuestion.id),
    'mission selection should prefer unseen questions over a question already answered'
  );

  const multiplicationQuestion = CurriculumData.getQuestionsBySkill('math_multiply_fast')[0];
  const wrongResult = LearningEngine.recordAnswer(learningState, multiplicationQuestion, false);
  assert.equal(wrongResult.ok, true);
  assert.equal(learningState.pedagogy.learning.skills.math_multiply_fast.status, 'needs_review');
  assert.equal(LearningEngine.getDueReviewItems(learningState).length, 1);
  const correctResult = LearningEngine.recordAnswer(learningState, multiplicationQuestion, true);
  assert.equal(correctResult.ok, true);
  assert.ok(learningState.pedagogy.learning.skills.math_multiply_fast.mastery > 0);

  const completedMission = LearningEngine.recordMissionCompletion(learningState, currentMission, { accuracy: 80, answers: 5 });
  assert.equal(completedMission.ok, true);
  assert.equal(completedMission.firstCompletion, true);
  assert.equal(learningState.pedagogy.learning.currentDay, 2);

  for (let day = 2; day <= 5; day += 1) {
    const mission = LearningEngine.getCurrentMission(learningState);
    LearningEngine.recordMissionCompletion(learningState, mission, { accuracy: 80, answers: 5 });
  }
  const bossGate = LearningEngine.canUnlockWeeklyBoss(learningState, 1);
  assert.equal(typeof bossGate.ok, 'boolean');
  assert.equal(typeof bossGate.averageMastery, 'number');
  assert.equal(bossGate.totalDays, 5);
  assert.equal(Array.isArray(bossGate.skills), true);
  assert.ok(bossGate.skills.length >= 1);
  assert.equal(typeof bossGate.reason, 'string');
  const mixedBossQuestions = LearningEngine.selectQuestionsForWeeklyBoss(learningState, 3, 10);
  assert.ok(mixedBossQuestions.length >= 2);
  assert.ok(new Set(mixedBossQuestions.map(question => question.subject)).size >= 2);
  const bossRotationState = StorageService.normalizeState(null);
  const initialBossPair = LearningEngine.selectQuestionsForWeeklyBoss(bossRotationState, 1, 2);
  assert.equal(initialBossPair.length, 2);
  LearningEngine.recordAnswer(bossRotationState, initialBossPair[0], true);
  const rotatedBossPair = LearningEngine.selectQuestionsForWeeklyBoss(bossRotationState, 1, 1);
  assert.ok(
    !rotatedBossPair.some(question => question.id === initialBossPair[0].id),
    'weekly boss selection should prefer unseen questions over a question already answered'
  );
  const summaryQuestions = LearningEngine.selectQuestionsForWeeklyBoss(learningState, 1, 10);
  const bossSummary = LearningEngine.recordWeeklyBossSummary(learningState, 1, {
    accuracy: 82,
    answers: summaryQuestions.length,
    correct: Math.max(1, summaryQuestions.length - 1),
    incorrect: 1,
    answerLog: summaryQuestions.map((question, index) => ({
      subject: question.subject,
      skill: question.skill,
      correct: index !== 0
    }))
  });
  assert.equal(bossSummary.week, 1);
  assert.ok(bossSummary.subjects.length >= 2);
  assert.equal(Array.isArray(bossSummary.provenSubjects), true);
  assert.equal(Array.isArray(bossSummary.reviewSkills), true);
  assert.equal(LearningEngine.getWeeklyBossSummary(learningState, 1).key, bossSummary.key);
  const postBossPlan = LearningEngine.getPostBossReviewPlan(learningState, 1);
  assert.ok(postBossPlan);
  assert.equal(postBossPlan.week, 1);
  assert.equal(postBossPlan.completed, false);
  const postBossQuestions = LearningEngine.selectQuestionsForPostBossReview(learningState, 1, 10);
  assert.ok(postBossQuestions.length >= 1);
  assert.ok(postBossQuestions.every(question => postBossPlan.skills.some(item => item.id === question.skill)));
  if (postBossQuestions.length > 2) {
    LearningEngine.recordAnswer(learningState, postBossQuestions[0], true);
    const rotatedPostBossQuestions = LearningEngine.selectQuestionsForPostBossReview(learningState, 1, 1);
    assert.ok(
      !rotatedPostBossQuestions.some(question => question.id === postBossQuestions[0].id),
      'post-boss review selection should prefer unseen questions over a question already answered'
    );
  }
  const subjectSummary = LearningEngine.getSubjectSummary(learningState);
  assert.equal(subjectSummary.length, 6);
  assert.ok(subjectSummary.find(subject => subject.id === 'math').attempts >= 2);
  const weekPlan = LearningEngine.getWeekPlan(learningState, 1);
  assert.equal(weekPlan.days.length, 5);
  assert.equal(weekPlan.completedCount, 5);
  const recommendations = LearningEngine.getDailyRecommendations(learningState);
  assert.ok(recommendations.actions.length >= 1);
  const weakSkills = LearningEngine.getWeakSkillRecommendations(learningState, 3);
  assert.ok(weakSkills.length >= 1);
  const evidenceReport = LearningEngine.getWeeklyEvidence(learningState, 1);
  assert.equal(evidenceReport.totalCount, 5);
  assert.equal(typeof evidenceReport.averageAccuracy, 'number');
  const summerTimeline = LearningEngine.getSummerTimeline(learningState);
  assert.equal(summerTimeline.length, CurriculumData.summerWeeks.length);
  assert.ok(summerTimeline[0].completedCount >= 0);
  const offlineMission = LearningEngine.getMissionByPosition(5, 3);
  const offlineSubmission = LearningEngine.submitOfflineEvidence(learningState, offlineMission, 'He clasificado objetos de casa por materiales.');
  assert.equal(offlineSubmission.ok, true);
  assert.equal(LearningEngine.getPendingOfflineEvidence(learningState).length, 1);
  const offlineApproval = LearningEngine.approveOfflineEvidence(learningState, offlineSubmission.item.id, 'parent');
  assert.equal(offlineApproval.ok, true);
  assert.equal(LearningEngine.getPendingOfflineEvidence(learningState).length, 0);
  assert.ok(learningState.pedagogy.learning.missionHistory[offlineMission.key]);

  const mathMission = LearningEngine.getNextMissionBySubject(learningState, 'math');
  const combatApp = {
    getCurriculumMissionForCombat() { return mathMission; },
    getTodayStats() { return { answers: 0, correct: 0, incorrect: 0 }; },
    saveState() {},
    showNotice() {},
    showRewardModal() {},
    showScreen() {}
  };
  const curriculumCombat = new CombatSession(1, false, learningState, combatApp);
  curriculumCombat.generateQuestionsList();
  assert.equal(curriculumCombat.curriculumMission.subject.id, 'math');
  assert.equal(curriculumCombat.questionsList.length, curriculumCombat.questionCount);
  assert.ok(
    curriculumCombat.questionsList.every(question => question.type === 'curriculum-tower'),
    'tower combat should use tower curriculum questions, got ' + [...new Set(curriculumCombat.questionsList.map(question => question.type))].join(', ')
  );
  assert.ok(
    curriculumCombat.questionsList.every(question => question.subject === 'language' || question.subject === 'math'),
    'tower floor 1 should stay in language/math, got ' + [...new Set(curriculumCombat.questionsList.map(question => question.subject))].join(', ')
  );
  curriculumCombat.currentQuestion = curriculumCombat.questionsList[0];
  const previousAttempts = learningState.pedagogy.learning.skills[curriculumCombat.currentQuestion.skill].attempts;
  curriculumCombat.recordCurriculumAnswer(false);
  assert.equal(learningState.pedagogy.learning.skills[curriculumCombat.currentQuestion.skill].attempts, previousAttempts + 1);

  const scienceTowerApp = {
    ...combatApp,
    currentTowerFloor: 5
  };
  const scienceCombat = new CombatSession(5, false, learningState, scienceTowerApp);
  scienceCombat.generateQuestionsList();
  assert.equal(scienceCombat.questionsList.length, scienceCombat.questionCount);
  assert.ok(scienceCombat.questionsList.every(question => question.type === 'curriculum-tower'));
  assert.ok(new Set(scienceCombat.questionsList.map(question => question.subject)).size >= 2);

  const bossCombat = new CombatSession(3, true, learningState, combatApp);
  bossCombat.generateQuestionsList();
  assert.equal(bossCombat.questionsList.length, bossCombat.questionCount);
  assert.ok(bossCombat.questionsList.every(question => question.type === 'curriculum-boss'));
  assert.ok(new Set(bossCombat.questionsList.map(question => question.subject)).size >= 2);
  const reviewCombat = new CombatSession('post-boss-review', false, learningState, combatApp);
  reviewCombat.generateQuestionsList();
  assert.equal(reviewCombat.questionsList.length, reviewCombat.questionCount);
  assert.ok(reviewCombat.questionsList.every(question => question.type === 'curriculum-review'));
  const reviewCompletion = LearningEngine.recordPostBossReviewCompletion(learningState, 1, { accuracy: 90, answers: 10 });
  assert.equal(reviewCompletion.ok, true);
  assert.ok(reviewCompletion.spacedPlan);
  assert.deepEqual(reviewCompletion.spacedPlan.dates, [
    LearningEngine.addDays(LearningEngine.todayKey(), 1),
    LearningEngine.addDays(LearningEngine.todayKey(), 3),
    LearningEngine.addDays(LearningEngine.todayKey(), 7)
  ]);
  assert.ok(LearningEngine.getUpcomingSpacedReviews(learningState).length >= 3);
  assert.equal(LearningEngine.getPostBossReviewPlan(learningState, 1).completed, true);
  const profileForDueReview = LearningEngine.getProfile(learningState);
  profileForDueReview.reviewQueue
    .filter(item => item.source === 'post_boss_spaced' && item.week === 1)
    .slice(0, 1)
    .forEach(item => {
      item.dueAt = LearningEngine.todayKey();
    });
  assert.equal(LearningEngine.getPostBossReviewPlan(learningState, 1).completed, false);
  const spacedReviewCompletion = LearningEngine.recordPostBossReviewCompletion(learningState, 1, { accuracy: 100, answers: 3 });
  assert.equal(spacedReviewCompletion.ok, true);
  assert.equal(spacedReviewCompletion.streak.current, 1);
  assert.ok(spacedReviewCompletion.recoveryNote);
  assert.ok(spacedReviewCompletion.recoveryNote.clearedCount >= 1);
  assert.ok(Array.isArray(spacedReviewCompletion.recoveryNote.remainingDates));
  assert.equal(LearningEngine.getLatestSpacedRecoveryNote(learningState).key, spacedReviewCompletion.recoveryNote.key);
  assert.equal(LearningEngine.getSpacedReviewStreak(learningState).best, 1);
  LearningEngine.getProfile(learningState).reviewQueue
    .filter(item => item.source === 'post_boss_spaced' && item.week === 1)
    .slice(0, 1)
    .forEach(item => {
      item.dueAt = LearningEngine.addDays(LearningEngine.todayKey(), -1);
    });
  const overdueSummary = LearningEngine.getSpacedReviewAlertSummary(learningState);
  assert.equal(overdueSummary.hasAlert, true);
  assert.ok(overdueSummary.count >= 1);
  assert.equal(overdueSummary.recoveryWeek, 1);
  assert.ok(overdueSummary.skills.length >= 1);

  const progressState = StorageService.normalizeState(null);
  for (let i = 1; i <= 5; i += 1) {
    const completion = ProgressService.recordCompletion(progressState, 1, false, { accuracy: 80 + i });
    assert.equal(completion.firstCompletion, true);
    assert.equal(completion.session.day, i);
  }
  assert.equal(ProgressService.completedDaysCount(progressState, 1), 5);
  assert.equal(ProgressService.canStart(progressState, 1, true).ok, true);
  const boss = ProgressService.recordCompletion(progressState, 1, true, { accuracy: 95 });
  assert.equal(boss.firstCompletion, true);
  assert.equal(progressState.player.currentWeek, 2);
  assert.equal(ProgressService.claimReward(progressState, boss.key), true);
  assert.equal(ProgressService.claimReward(progressState, boss.key), false);
  ProgressService.recordAnswer(progressState, { type: 'mult', a: 3, b: 4 }, true);
  ProgressService.recordAnswer(progressState, { type: 'mult', a: 3, b: 5 }, false);
  assert.deepEqual(
    {
      correct: progressState.progress.tableStats['3'].correct,
      incorrect: progressState.progress.tableStats['3'].incorrect,
      attempts: progressState.progress.tableStats['3'].attempts
    },
    { correct: 1, incorrect: 1, attempts: 2 }
  );

  const securityState = StorageService.normalizeState(null);
  for (let i = 1; i < ParentalSecurityService.MAX_ATTEMPTS; i += 1) {
    const result = ParentalSecurityService.verifyPin(securityState, '0000');
    assert.equal(result.ok, false);
    assert.equal(result.locked, false);
  }
  const locked = ParentalSecurityService.verifyPin(securityState, '0000');
  assert.equal(locked.locked, true);
  securityState.config.parentalSecurity.lockedUntil = 0;
  assert.equal(ParentalSecurityService.updatePin(securityState, '1357').ok, true);
  assert.equal(ParentalSecurityService.verifyPin(securityState, '2468').ok, false);
  assert.equal(ParentalSecurityService.verifyPin(securityState, '1357').ok, true);
  assert.ok(securityState.config.parentalSecurity.auditLog.length >= 1);

  const dialogApp = new App();
  const confirmPromise = dialogApp.showConfirm('Continuar?', 'Prueba');
  assert.equal(document.getElementById('app-dialog').style.display, 'flex');
  document.getElementById('app-dialog-cancel').onclick();
  assert.equal(await confirmPromise, false);

  const noticePromise = dialogApp.showNotice('Listo', 'Aviso');
  document.getElementById('app-dialog-confirm').onclick();
  assert.equal(await noticePromise, true);

  const fakeApp = {
    getTodayStats() { return { answers: 0, correct: 0, incorrect: 0 }; },
    saveState() {},
    showNotice() {},
    showRewardModal() {},
    showScreen() {}
  };
  const combat = new CombatSession(1, false, progressState, fakeApp);
  assert.equal(combat.app, fakeApp);
  assert.equal(combat.state, progressState);
  assert.equal(combat.weekNum, 1);
})();
`;

  await vm.runInNewContext(testSource, context, {
    filename: 'index.js',
    timeout: 5000
  });
}

run()
  .then(() => {
    console.log('core smoke tests passed');
  })
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
