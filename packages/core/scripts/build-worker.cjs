const { spawnSync } = require('node:child_process');
const { mkdirSync } = require('node:fs');
const { resolve } = require('node:path');

const packageRoot = resolve(__dirname, '..');
const generatedDir = resolve(packageRoot, 'src', 'generated');

mkdirSync(generatedDir, { recursive: true });

const result = spawnSync('pnpm', ['exec', 'tsup'], {
  cwd: packageRoot,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    BUILD_TARGET: 'worker',
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
