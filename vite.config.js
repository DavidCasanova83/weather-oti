import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      allow: ['..'] // Pour permettre l'accès au dossier parent où se trouve data
    }
  }
});
