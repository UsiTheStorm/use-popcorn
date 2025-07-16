import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const isGitHub = process.env.DEPLOY_TARGET === 'GH';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGitHub ? '/use-popcorn/' : '/',
  build: {
    sourcemap: true,
    emptyOutDir: true,
  },
});
