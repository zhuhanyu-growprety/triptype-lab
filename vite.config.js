import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.GITHUB_PAGES ? '/triptype-lab/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
