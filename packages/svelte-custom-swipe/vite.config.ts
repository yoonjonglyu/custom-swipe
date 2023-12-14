import { resolve } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'svelte-custom-swipe',
      // the proper extensions will be added
      fileName: 'svelte-custom-swipe',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['svelte', 'swipe-core-provider'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
				exports: 'named',
        globals: {
          svelte: 'svelte',
          'swipe-core-provider': 'swipe-core-provider',
        },
      },
    },
  },
  server: {
    fs: {
      allow: ['lib'],
    },
  },
  plugins: [svelte()],
});
