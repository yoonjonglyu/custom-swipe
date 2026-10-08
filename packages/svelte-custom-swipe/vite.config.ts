import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      'swipe-core-provider': path.resolve(__dirname, '../core/src/index.ts'),
    },
  },
});

