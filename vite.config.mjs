import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const licenseBanner = '/*! For license information please see CraftArticle.js.LICENSE.txt */\n';

export default defineConfig({
  plugins: [
    {
      name: 'license-banner',
      generateBundle(_options, bundle) {
        for (const file of Object.values(bundle)) {
          if (file.type === 'chunk') {
            file.code = licenseBanner + file.code;
          }
        }
      },
    },
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2019',
    lib: {
      entry: resolve('src/assets/editor/js/index.js'),
      name: 'CraftArticleBundle',
      formats: ['iife'],
      fileName: () => 'js/CraftArticle.js',
    },
    rollupOptions: {
      output: {
        // Match the previous Mix bundle: implicit assignments such as `$label`
        // and `url` stay sloppy-mode globals instead of throwing in strict mode.
        strict: false,
        extend: true,
      },
    },
  },
});
