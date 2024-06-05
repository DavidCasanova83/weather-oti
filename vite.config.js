import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/meteo', // généralement, vous pouvez laisser ce champ tel quel pour Vercel
});
