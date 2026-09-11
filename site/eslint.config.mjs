import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Destructuring a prop only to keep it off the DOM is intended.
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    },
  },
  // Build output, and copies of the skill files the content step generates.
  globalIgnores(['.next/**', 'out/**', '.content/**', 'public/raw/**', 'next-env.d.ts']),
]);
