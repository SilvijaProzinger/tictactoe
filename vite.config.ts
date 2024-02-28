import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

//const apiTarget = 'http://tictactoe.aboutdream.io';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  /*server: {
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },*/
})
