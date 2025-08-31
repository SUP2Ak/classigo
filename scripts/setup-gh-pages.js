import { mkdirSync, copyFileSync, cpSync } from 'fs';
import { join } from 'path';

// Create temp directory for gh-pages content
const tempDir = 'temp-gh-pages';
mkdirSync(tempDir, { recursive: true });

// Copy built examples to temp directory
cpSync('examples/dist', tempDir, { recursive: true });

// Copy classigo UMD build for examples
copyFileSync('dist/index.umd.js', join(tempDir, 'classigo.umd.js'));

/* global console */
console.log('✅ Setup gh-pages completed');
