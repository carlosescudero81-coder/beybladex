const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
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

function extractIds(markup) {
  return [...markup.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
}

function extractScriptSrcs(markup) {
  return [...markup.matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(match => match[1]);
}

function createDomFromHtml(markup) {
  const ids = extractIds(markup);
  const elements = new Map();
  const screenIds = ids.filter(id => id.startsWith('screen-'));
  const workshopTabs = [];
  const avatarTabs = [];

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
    querySelector(selector) {
      if (selector === '.header-left') return createElement('header-left');
      if (selector === '#avatar-customizer-tabs .workshop-tab.active') {
        return avatarTabs.find(tab => String(tab.className).includes('active')) || avatarTabs[0] || createTab('avatar-expression-tab', 'expression', 'avatar-customizer-tabs');
      }
      if (selector === '.workshop-tab.active') return workshopTabs[0] || createTab('workshop-core-tab', 'core', 'workshop-tabs');
      return createElement(`query-${selector}`);
    },
    querySelectorAll(selector) {
      if (selector === '.screen') return screenIds.map(id => createElement(id));
      if (selector === '.workshop-tab') return [...avatarTabs, ...workshopTabs];
      if (selector === '#avatar-customizer-tabs .workshop-tab') return avatarTabs;
      return [];
    }
  };

  function createClassList(element) {
    return {
      add(className) {
        const classes = new Set(String(element.className || '').split(/\s+/).filter(Boolean));
        classes.add(className);
        element.className = [...classes].join(' ');
      },
      remove(className) {
        const classes = new Set(String(element.className || '').split(/\s+/).filter(Boolean));
        classes.delete(className);
        element.className = [...classes].join(' ');
      },
      toggle(className, force) {
        if (force === false) this.remove(className);
        else this.add(className);
      }
    };
  }

  function createElement(id) {
    if (!elements.has(id)) {
      const element = {
        id,
        style: {},
        className: id === 'screen-start' ? 'screen active' : id.startsWith('screen-') ? 'screen' : '',
        innerText: '',
        innerHTML: '',
        textContent: '',
        value: '',
        checked: false,
        disabled: false,
        title: '',
        dataset: {},
        parentElement: { id: '' },
        onclick: null,
        onchange: null,
        oninput: null,
        onkeydown: null,
        offsetWidth: 1,
        appendChild(child) {
          child.parentElement = element;
        },
        addEventListener(type, handler) {
          element[`on${type}`] = handler;
        },
        remove() {},
        focus() {
          documentStub.activeElement = element;
        },
        click() {
          if (typeof element.onclick === 'function') element.onclick({ target: element });
        },
        setAttribute(name, value) {
          element[name] = value;
          if (name === 'disabled') element.disabled = true;
        },
        removeAttribute(name) {
          delete element[name];
          if (name === 'disabled') element.disabled = false;
        },
        querySelector() {
          return createElement(`${id}-child`);
        },
        querySelectorAll() {
          return [];
        },
        closest() {
          return element;
        }
      };
      element.classList = createClassList(element);
      elements.set(id, element);
    }
    return elements.get(id);
  }

  function createTab(id, part, parentId) {
    const tab = createElement(id);
    tab.className = 'workshop-tab';
    tab.dataset.part = part;
    tab.parentElement = { id: parentId };
    return tab;
  }

  ids.forEach(id => createElement(id));
  ['expression', 'hairStyle', 'hairColor', 'hat', 'glasses'].forEach(part => {
    avatarTabs.push(createTab(`avatar-${part}-tab`, part, 'avatar-customizer-tabs'));
  });
  ['core', 'ring', 'driver', 'color'].forEach(part => {
    workshopTabs.push(createTab(`workshop-${part}-tab`, part, 'workshop-tabs'));
  });
  workshopTabs[0].className = 'workshop-tab active';
  avatarTabs[0].className = 'workshop-tab active';
  documentStub.activeElement = createElement('initial-focus');

  return { documentStub, elements };
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

function runStaticValidation() {
  assert.deepEqual(extractScriptSrcs(html), scriptFiles, 'scripts load in validated browser order');
  scriptFiles.forEach(file => {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} exists`);
  });

  [
    'btn-start-game',
    'btn-goto-map',
    'btn-goto-language',
    'btn-goto-english',
    'btn-goto-science',
    'btn-goto-workshop',
    'btn-goto-cards',
    'btn-goto-parents',
    'btn-goto-modules',
    'btn-start-training',
    'btn-start-boss',
    'boss-readiness-panel',
    'boss-readiness-score',
    'boss-readiness-detail',
    'screen-diagnostic',
    'diagnostic-question-list',
    'diagnostic-result-panel',
    'btn-diagnostic-complete',
    'summer-planner-panel',
    'x-tower-panel',
    'tower-current-floor',
    'btn-tower-enter',
    'planner-week-track',
    'planner-actions-list',
    'btn-planner-primary',
    'spaced-review-strip',
    'btn-combat-hint',
    'btn-combat-pause',
    'btn-parent-gate-submit',
    'btn-parent-generate-reinforcement',
    'btn-parent-export-weekly-report',
    'language-reading-title',
    'language-question-list',
    'btn-language-complete',
    'screen-subject',
    'subject-question-list',
    'btn-subject-complete',
    'screen-offline',
    'offline-evidence-input',
    'btn-offline-submit',
    'parent-weekly-evidence',
    'parent-boss-summary',
    'parent-weekly-recommendations',
    'parent-spaced-alerts',
    'parent-summer-timeline',
    'parent-offline-validation-list',
    'reward-modal',
    'reward-boss-summary',
    'bey-type-grid',
    'app-dialog'
  ].forEach(id => {
    assert.ok(html.includes(`id="${id}"`), `critical UI id exists: ${id}`);
  });

  assert.match(html, /id="app-dialog"[^>]+role="dialog"[^>]+aria-modal="true"/, 'app dialog is announced as modal');
  assert.match(html, /id="parent-gate-modal"[^>]+role="dialog"[^>]+aria-modal="true"/, 'parent gate is announced as modal');
  assert.ok(!source.includes('app.state.config.soundEnabled'), 'audio does not read the app singleton directly');
  assert.ok(html.includes('Beyblade X Academy'), 'Beyblade X Academy branding is visible');
  assert.ok(html.includes('assets/personajes/'), 'individual character assets are referenced');
  assert.ok(html.includes('assets/peonzas/'), 'individual bey assets are referenced');
  assert.ok(html.includes('assets/torre/torre_x_del_conocimiento.png'), 'transparent PNG tower asset is referenced');
  assert.ok(html.includes('assets/estadios/'), 'individual stadium assets are referenced');
  assert.ok(source.includes('const BEYBLADE_CHARACTERS'), 'Beyblade X characters are centralized in assets');
  assert.ok(source.includes('const BEYBLADE_BEYS'), 'Beyblade X beys are centralized in assets');
  assert.ok(source.includes('const BEYBLADE_STADIUMS'), 'Beyblade X stadiums are centralized in assets');
  assert.ok(source.includes('assets/personajes/01_jaxon_cross_blader_x.png'), 'character data uses transparent PNG assets');
  assert.ok(source.includes('assets/peonzas/01_sword_dran.png'), 'bey data uses transparent PNG assets');
  assert.ok(source.includes('assets/estadios/01_estadio_de_entrenamiento.png'), 'stadium data uses transparent PNG assets');
  assert.ok(!html.includes('assets/personajes.jpg'), 'legacy personajes sheet is not referenced in HTML');
  assert.ok(!html.includes('assets/peonzas.jpg'), 'legacy peonzas sheet is not referenced in HTML');
  assert.ok(!html.includes('assets/estadios.jpg'), 'legacy estadios sheet is not referenced in HTML');
  assert.ok(!source.includes('assets/personajes.jpg'), 'legacy personajes sheet is not referenced in scripts');
  assert.ok(!source.includes('assets/peonzas.jpg'), 'legacy peonzas sheet is not referenced in scripts');
  assert.ok(!source.includes('assets/estadios.jpg'), 'legacy estadios sheet is not referenced in scripts');
  assert.ok(!source.includes('torre_x_del_conocimiento.jpg'), 'tower JPG is not referenced in scripts');
  assert.ok(!source.includes('CHARACTER_SPRITES'), 'character sprite sheets are not used');
  assert.ok(!source.includes('BEY_SPRITES'), 'bey sprite sheets are not used');
  assert.ok(!source.includes('renderSpriteImage'), 'sprite rendering helper is not used');
  assert.ok(!source.includes('background-position:'), 'sprite background positioning is not used');
  assert.ok(source.includes('const X_TOWER_FLOORS'), 'X Tower floors are centralized in assets');
  assert.ok(source.includes('Array.from({ length: 50 }'), 'X Tower defines 50 visible floors');
  assert.ok(source.includes('window.CurriculumData = CurriculumData'), 'curriculum data is exposed for the app');
  assert.ok(source.includes('window.LearningEngine = LearningEngine'), 'learning engine is exposed for the app');
  assert.equal(packageJson.scripts.check, 'node tests/check-syntax.cjs');
}

async function runRuntimeValidation() {
  const { documentStub } = createDomFromHtml(html);
  const intervals = new Set();
  let timerId = 0;
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
    setTimeout(callback) {
      if (typeof callback === 'function') callback();
      return 1;
    },
    clearTimeout() {},
    setInterval() {
      timerId += 1;
      intervals.add(timerId);
      return timerId;
    },
    clearInterval(id) {
      intervals.delete(id);
    },
    Date,
    Math,
    Promise
  };
  context.window.window = context.window;
  context.window.document = documentStub;
  context.window.localStorage = context.localStorage;

  const testSource = `${source}

(async () => {
  app.init();
  assert.equal(CurriculumData.validate().ok, true);
  assert.ok(window.__SpinAcademyCore.LearningEngine);
  assert.equal(CurriculumData.summerWeeks[0].dailyPlan.length, 5);
  assert.ok(CurriculumData.diagnosticBlueprint.length >= 5);
  assert.equal(app.currentScreen, 'start');
  assert.ok(app.state.pedagogy.learning.skills.lang_read_fluency);
  assert.equal(document.getElementById('app-header').style.display, 'none');

  document.getElementById('btn-start-game').onclick();
  assert.equal(app.currentScreen, 'avatar');
  document.getElementById('avatar-name-input').value = 'Carlitos Pro';
  document.getElementById('avatar-name-input').oninput({ target: document.getElementById('avatar-name-input') });
  document.getElementById('btn-confirm-avatar').onclick();
  assert.equal(app.currentScreen, 'diagnostic');
  document.getElementById('btn-goto-map').onclick();
  assert.equal(app.currentScreen, 'map');
  app.showScreen('diagnostic');
  assert.equal(app.state.player.name, 'Carlitos Pro');
  assert.ok(app.diagnosticQuestions.length >= 5);
  app.diagnosticQuestions.forEach((question, index) => {
    app.handleDiagnosticAnswer(index, question.answer);
  });
  assert.equal(Object.keys(app.diagnosticAnswers).length, app.diagnosticQuestions.length);
  app.completeDiagnosticPlacement();
  assert.ok(LearningEngine.isDiagnosticComplete(app.state));
  assert.ok(document.getElementById('diagnostic-result-panel').innerHTML.includes('Resultado inicial'));
  app.completeDiagnosticPlacement();
  assert.equal(app.currentScreen, 'map');
  const postBossSeedQuestion = CurriculumData.getQuestionsBySkill('math_add_sub')[0];
  LearningEngine.recordWeeklyBossSummary(app.state, 1, {
    accuracy: 60,
    answers: 1,
    correct: 0,
    incorrect: 1,
    answerLog: [{
      subject: postBossSeedQuestion.subject,
      skill: postBossSeedQuestion.skill,
      correct: false
    }]
  });
  app.renderSummerPlanner();
  assert.ok(document.getElementById('planner-week-label').innerText.includes('Semana'));
  assert.ok(app.plannerActions.length >= 1);
  assert.ok(LearningEngine.getDailyRecommendations(app.state).actions.length >= 1);
  assert.equal(app.plannerActions[0].type, 'post_boss_review');
  app.openPlannerAction(0);
  assert.equal(app.currentScreen, 'combat');
  assert.equal(app.selectedWeekNum, 'post-boss-review');
  assert.ok(app.combatSession.questionsList.every(question => question.type === 'curriculum-review'));
  const spacedCompletion = LearningEngine.recordPostBossReviewCompletion(app.state, 1, { accuracy: 75, answers: 10 });
  assert.equal(spacedCompletion.ok, true);
  assert.ok(LearningEngine.getUpcomingSpacedReviews(app.state).length >= 3);
  app.exitCombatToMap();
  app.renderSummerPlanner();
  assert.ok(document.getElementById('spaced-review-strip').innerHTML.includes('Calendario 1-3-7'));
  assert.ok(document.getElementById('spaced-review-strip').innerHTML.includes('Programado'));
  LearningEngine.getProfile(app.state).reviewQueue
    .filter(item => item.source === 'post_boss_spaced' && item.week === 1)
    .slice(0, 1)
    .forEach(item => {
      item.dueAt = LearningEngine.todayKey();
    });
  app.renderSummerPlanner();
  assert.ok(document.getElementById('spaced-review-strip').innerHTML.includes('Repasar ahora'));
  const dueSpacedCompletion = LearningEngine.recordPostBossReviewCompletion(app.state, 1, { accuracy: 90, answers: 4 });
  assert.equal(dueSpacedCompletion.streak.current, 1);
  assert.ok(dueSpacedCompletion.recoveryNote);
  LearningEngine.getProfile(app.state).reviewQueue
    .filter(item => item.source === 'post_boss_spaced' && item.week === 1)
    .slice(0, 1)
    .forEach(item => {
      item.dueAt = LearningEngine.addDays(LearningEngine.todayKey(), -1);
    });
  app.renderSummerPlanner();
  assert.ok(document.getElementById('spaced-review-strip').innerHTML.includes('racha'));

  app.showDailyMissions(1);
  assert.equal(app.selectedWeekNum, 1);
  assert.equal(document.getElementById('daily-mission-modal').style.display, 'flex');
  assert.equal(document.getElementById('btn-start-training').disabled, false);
  assert.equal(document.getElementById('btn-start-boss').disabled, true);
  assert.ok(document.getElementById('boss-readiness-detail').innerHTML.includes('misiones'));
  assert.ok(document.getElementById('boss-readiness-score').innerText.includes('%'));

  app.showScreen('language');
  assert.equal(app.currentScreen, 'language');
  assert.ok(app.languageReading);
  assert.ok(document.getElementById('language-reading-text').innerText.length > 0);
  const reading = app.languageReading;
  app.handleLanguageAnswer(0, reading.questions[0].answer);
  assert.equal(Object.keys(app.languageAnswers).length, 1);
  assert.ok(app.state.pedagogy.learning.skills[reading.skill].attempts >= 1);
  reading.questions.slice(1).forEach((question, index) => {
    app.handleLanguageAnswer(index + 1, question.answer);
  });
  document.getElementById('language-writing-input').value = 'He entendido la historia y puedo explicarla.';
  app.showNotice = () => Promise.resolve(true);
  app.completeLanguageMission();
  assert.ok(app.state.pedagogy.learning.skills.lang_writing_story.attempts >= 1);

  app.openSubjectMission('english');
  assert.equal(app.currentScreen, 'subject');
  assert.equal(app.subjectMission.subject.id, 'english');
  assert.ok(app.subjectQuestions.length >= 1);
  app.handleSubjectAnswer(0, app.subjectQuestions[0].answer);
  app.subjectQuestions.slice(1).forEach((question, index) => {
    app.handleSubjectAnswer(index + 1, question.answer);
  });
  document.getElementById('subject-evidence-input').value = 'I can say hello.';
  app.completeSubjectMission();
  assert.ok(app.state.pedagogy.learning.skills[app.subjectMission.skill.id].attempts >= 1);

  app.openSubjectMission('science');
  assert.equal(app.subjectMission.subject.id, 'science');
  assert.ok(app.subjectQuestions.length >= 1);
  app.handleSubjectAnswer(0, app.subjectQuestions[0].answer);
  app.subjectQuestions.slice(1).forEach((question, index) => {
    app.handleSubjectAnswer(index + 1, question.answer);
  });
  document.getElementById('subject-evidence-input').value = 'He observado y puedo explicarlo.';
  app.completeSubjectMission();
  assert.ok(app.state.pedagogy.learning.skills[app.subjectMission.skill.id].attempts >= 1);

  app.state.pedagogy.learning.currentWeek = 5;
  app.state.pedagogy.learning.currentDay = 3;
  const offlineMission = LearningEngine.getCurrentMission(app.state);
  assert.equal(offlineMission.missionType.id, 'project');
  app.openOfflineMission(offlineMission);
  assert.equal(app.currentScreen, 'offline');
  document.getElementById('offline-evidence-input').value = 'He clasificado cinco objetos por materiales.';
  app.submitOfflineEvidence();
  assert.equal(LearningEngine.getPendingOfflineEvidence(app.state).length, 1);

  app.showParentGate();
  assert.equal(document.getElementById('parent-gate-modal').style.display, 'flex');
  document.getElementById('parent-gate-input').value = '2468';
  app.verifyParentGate();
  assert.equal(app.currentScreen, 'parents');
  assert.equal(document.getElementById('parent-gate-modal').style.display, 'none');
  assert.ok(ParentalSecurityService.isSessionActive(app.state));
  assert.ok(document.getElementById('parent-weekly-evidence').innerHTML.includes('Semana'));
  assert.ok(document.getElementById('parent-boss-summary').innerHTML.includes('Jefe semanal'));
  assert.ok(document.getElementById('parent-spaced-alerts').innerHTML.includes('atrasado'));
  assert.ok(document.getElementById('parent-spaced-alerts').innerHTML.includes('Lanzar repaso'));
  assert.ok(document.getElementById('parent-spaced-alerts').innerHTML.includes('Ultima recuperacion'));
  const recoverButton = document.querySelector('[data-spaced-recover-week]');
  assert.ok(recoverButton);
  app.recoverOverdueSpacedReview(1);
  assert.equal(app.currentScreen, 'combat');
  assert.equal(app.selectedWeekNum, 'post-boss-review');
  assert.ok(app.combatSession.questionsList.every(question => question.type === 'curriculum-review'));
  app.exitCombatToMap();
  app.showScreen('parents');
  app.renderParentsPanel();
  assert.ok(document.getElementById('parent-weekly-recommendations').innerHTML.length > 0);
  assert.ok(document.getElementById('parent-summer-timeline').innerHTML.includes('Semana 1'));
  assert.ok(document.getElementById('parent-offline-validation-list').innerHTML.includes('Semana 5'));
  const pendingOffline = LearningEngine.getPendingOfflineEvidence(app.state)[0];
  app.approveOfflineEvidence(pendingOffline.id);
  assert.equal(LearningEngine.getPendingOfflineEvidence(app.state).length, 0);
  assert.ok(app.state.pedagogy.learning.missionHistory[offlineMission.key]);
  app.exportWeeklyFamilyReport();
  assert.ok(app.lastWeeklyReportHtml.includes('Informe semanal de Spin Academy'));
  assert.ok(app.lastWeeklyReportHtml.includes('Carlitos Pro'));
  assert.ok(app.lastWeeklyReportHtml.includes('Progreso por materia'));
  assert.ok(app.lastWeeklyReportHtml.includes('Linea temporal del verano'));
  assert.ok(app.lastWeeklyReportHtml.includes('Resumen del jefe semanal'));
  assert.ok(app.lastWeeklyReportHtml.includes('Calendario de repeticion espaciada'));
  assert.ok(app.lastWeeklyReportHtml.includes('Racha actual'));
  assert.ok(app.lastWeeklyReportHtml.includes('Alertas parentales'));
  assert.ok(app.lastWeeklyReportHtml.includes('Ultima recuperacion'));
  app.state.player.name = '<Carlitos>';
  const escapedReport = app.buildWeeklyFamilyReportHtml();
  assert.ok(escapedReport.includes('&lt;Carlitos&gt;'));

  const fakeCombat = {
    disposed: false,
    dispose() {
      this.disposed = true;
    }
  };
  app.combatSession = fakeCombat;
  app.exitCombatToMap();
  assert.equal(fakeCombat.disposed, true);
  assert.equal(app.combatSession, null);
  assert.equal(app.currentScreen, 'map');

  const combat = new CombatSession(1, false, app.state, app);
  combat.gaugeInterval = setInterval(() => {}, 20);
  combat.physTimer = setInterval(() => {}, 40);
  combat.dispose();
  assert.equal(combat.gaugeInterval, null);
  assert.equal(combat.physTimer, null);
})();
`;

  await vm.runInNewContext(testSource, context, {
    filename: 'product-validation.js',
    timeout: 5000
  });
}

runStaticValidation();
runRuntimeValidation()
  .then(() => {
    console.log('product validation passed');
  })
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
