import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactComponent',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      plugins: [
        {
          name: 'copy-styles',
          writeBundle() {
            // Create styles directory
            mkdirSync(resolve(__dirname, 'dist/styles'), { recursive: true });
            // Copy CSS file
            copyFileSync(
              resolve(__dirname, 'src/styles/globals.css'),
              resolve(__dirname, 'dist/styles/globals.css')
            );
          }
        }
      ]
    },
    sourcemap: true,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});