import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{spec,test}.ts'],
    exclude: ['test/**/*.{spec,test}.ts'], // Exclure les tests e2e
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.spec.ts',
        '**/*.config.ts',
      ],
    },
    alias: {
      '@src': resolve(__dirname, './src'),
    },
  },
});
