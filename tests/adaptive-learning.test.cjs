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
    body: { appendChild() {} },
    addEventListener() {},
    removeEventListener() {},
    createElement(tagName) { return createElement(`${tagName}-${elements.size}`); },
    getElementById(id) { return createElement(id); },
    querySelector() { return createElement(`query-${elements.size}`); },
    querySelectorAll() { return []; }
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
        classList: { add() {}, remove() {}, toggle() {} },
        appendChild() {},
        remove() {},
        focus() { documentStub.activeElement = element; },
        click() { if (typeof element.onclick === 'function') element.onclick(); },
        setAttribute() {},
        removeAttribute() {},
        querySelector() { return createElement(`${id}-child`); },
        querySelectorAll() { return []; }
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
    getItem(key) { return store.has(key) ? store.get(key) : null; },
    setItem(key, value) { store.set(key, String(value)); },
    removeItem(key) { store.delete(key); },
    clear() { store.clear(); }
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
  this.createGain = () => ({ gain: audioParam, connect() {} });
}

async function run() {
  const documentStub = createDomStub();
  const context = {
    assert,
    console,
    localStorage: createLocalStorageStub(),
    document: documentStub,
    window: { AudioContext: AudioContextStub, webkitAudioContext: AudioContextStub },
    Blob: class BlobStub {
      constructor(parts, options) {
        this.parts = parts;
        this.options = options;
      }
    },
    URL: {
      createObjectURL() { return 'blob:spin-academy-test'; },
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
  console.log('Starting Adaptive Learning tests...');
  const state = StorageService.normalizeState(null);

  // 1. Test target difficulty adaptation
  const skillProgress = { id: 'math_add_sub', attempts: 3, correct: 3, incorrect: 0 };
  const baseDiff = 2;
  const highDiff = LearningEngine.adjustTargetDifficulty(skillProgress, baseDiff);
  assert.equal(highDiff, 3, 'High accuracy should increase difficulty');

  const lowProgress = { id: 'math_add_sub', attempts: 3, correct: 1, incorrect: 2 };
  const lowDiff = LearningEngine.adjustTargetDifficulty(lowProgress, baseDiff);
  assert.equal(lowDiff, 1, 'Low accuracy should decrease difficulty');

  // 2. Test parametric question resolution
  const qAdd = CurriculumData.questionBank.find(q => q.id === 'parametric-math-add-1');
  assert.ok(qAdd, 'Found parametric addition question template');
  const resolvedAdd = LearningEngine.resolveDynamicQuestion(qAdd, state);
  assert.notEqual(resolvedAdd.prompt, 'Calcula {numA} + {numB}.', 'Math placeholder numA and numB should be resolved');
  assert.ok(resolvedAdd.options.includes(resolvedAdd.answer), 'Options list must include correct answer');
  assert.equal(resolvedAdd.options.length, 3, 'Options should be cleaned up to exactly 3 choices');

  // 3. Test token replacement in linguistic templates
  const qLang = CurriculumData.questionBank.find(q => q.id === 'dynamic-lang-literal-1');
  assert.ok(qLang, 'Found dynamic language template');
  const resolvedLang = LearningEngine.resolveDynamicQuestion(qLang, state);
  assert.ok(!resolvedLang.prompt.includes('{name}'), 'Token {name} should be replaced');
  assert.ok(!resolvedLang.prompt.includes('{beyblade}'), 'Token {beyblade} should be replaced');
  assert.ok(!resolvedLang.prompt.includes('{location}'), 'Token {location} should be replaced');

  // 4. Test scaffolding (hints) for previously failed questions
  const profile = LearningEngine.getProfile(state);
  profile.questionHistory[resolvedAdd.id] = {
    questionId: resolvedAdd.id,
    attempts: 2,
    correct: 0,
    incorrect: 2,
    lastSeenAt: '2026-06-22',
    lastResult: 'incorrect'
  };
  const resolvedScaffolded = LearningEngine.resolveDynamicQuestion(qAdd, state);
  assert.ok(resolvedScaffolded.isScaffolded, 'Failed question should trigger scaffolding mode');
  assert.ok(resolvedScaffolded.prompt.includes('Pista'), 'Prompt should contain a hint when scaffolded');

  // 5. Test SM-2 Lite review intervals
  const qMult = CurriculumData.questionBank.find(q => q.id === 'parametric-math-mult-1');
  const reviewItem = LearningEngine.enqueueReview(profile, qMult);
  assert.equal(reviewItem.repetitions, 0, 'Initial SM-2 repetitions is 0');
  assert.equal(reviewItem.easeFactor, 2.5, 'Initial easeFactor is 2.5');

  const advanced = LearningEngine.advanceReviewItem(profile, qMult);
  assert.ok(advanced, 'Item is advanced in review queue');
  assert.equal(advanced.repetitions, 1, 'First correct answer sets repetitions to 1');
  assert.equal(advanced.easeFactor, 2.6, 'Ease factor is increased slightly on success');

  // 6. Test parental interest customization
  const latestProfile = LearningEngine.getProfile(state);
  latestProfile.parentInterests = {
    names: ['Dragoon'],
    beys: ['Driger'],
    objects: ['engranajes']
  };
  const resolvedCustom = LearningEngine.resolveDynamicQuestion(qLang, state);
  assert.ok(resolvedCustom.prompt.includes('Dragoon'), 'Custom name from parental setting should be used');
  assert.ok(resolvedCustom.prompt.includes('Driger'), 'Custom bey from parental setting should be used');

  console.log('All Adaptive Learning tests passed successfully!');
})();
`;

  await vm.runInNewContext(testSource, context, {
    filename: 'adaptive-learning-test.js',
    timeout: 5000
  });
}

run()
  .then(() => {
    console.log('adaptive learning tests passed');
  })
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
