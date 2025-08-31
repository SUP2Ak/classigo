/* global console */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Read the main package.json
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

// Create a minimal package.json for the dist folder
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  type: "module",
  main: "index.cjs",
  module: "index.mjs",
  types: "index.d.ts",
  exports: {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.cjs"
    }
  }
};

// Write the package.json to dist folder
writeFileSync(join('dist', 'package.json'), JSON.stringify(distPackageJson, null, 2));
console.log('✅ Copied package.json to dist folder');
