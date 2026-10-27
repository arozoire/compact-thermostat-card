import { readFileSync } from 'node:fs';

const file = 'dist/compact-thermostat-card.js';
const code = readFileSync(file, 'utf8');
const problems = [];
if (code.length < 5000) problems.push('bundle troppo piccolo');
if (/^\s*import[\s{]/m.test(code) || /\bimport\(/.test(code)) problems.push('contiene import esterni');
if (!code.includes('customElements.define')) problems.push('manca customElements.define');
if (code.includes('\r\n')) problems.push('contiene CRLF');
if (problems.length) {
  console.error(`FAIL ${file}: ${problems.join(', ')}`);
  process.exit(1);
}
console.log(`OK ${file} ${code.length} byte`);
