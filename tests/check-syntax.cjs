const { spawnSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const files = [
  'js/audio.js',
  'js/assets.js',
  'js/curriculum-data.js',
  'js/learning-engine.js',
  'js/services.js',
  'js/combat-session.js',
  'index.js',
  'tests/core-smoke.test.cjs',
  'tests/product-validation.test.cjs'
];

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, file)], {
    stdio: 'inherit'
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log('syntax checks passed');
