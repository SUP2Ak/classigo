/* global console, process, __dirname, require */

const fs = require('fs');
const path = require('path');

// Read the main types file
const mainTypesPath = path.resolve(__dirname, '../dist/index.d.ts');
const cjsTypesPath = path.resolve(__dirname, '../dist/index.cjs.d.ts');

if (fs.existsSync(mainTypesPath)) {
  const mainTypes = fs.readFileSync(mainTypesPath, 'utf8');
  
  // Convert ESM export to CommonJS export
  const cjsTypes = mainTypes.replace(
    'export default classigo;',
    'export = classigo;'
  );
  
  // Write the CJS types file
  fs.writeFileSync(cjsTypesPath, cjsTypes);
  console.log('✅ Generated CJS types file');
} else {
  console.error('❌ Main types file not found');
  process.exit(1);
}
