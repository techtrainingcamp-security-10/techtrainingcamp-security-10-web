import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvg from 'vite-plugin-react-svg';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactSvg({
      defaultExport: 'component',
      svgo: true,
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly"
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#be1d32',
          'link-color': '#be1d32',
          'disabled-bg': 'rgba(190, 29, 50, 0.6)',
          'disabled-color': '#fff'
        },
        javascriptEnabled: true,
      }
    }
  },
})
