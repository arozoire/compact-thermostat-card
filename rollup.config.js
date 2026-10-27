import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/compact-thermostat-card.ts',
  output: {
    file: 'dist/compact-thermostat-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    json(),
    typescript(),
    terser({ format: { comments: false } }),
  ],
};
