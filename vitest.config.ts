import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['lib/**/*.ts', 'context/**/*.tsx', 'app/api/**/*.ts'],
      exclude: ['node_modules/**', '.next/**', 'tests/**', '**/*.d.ts'],
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
