import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('postcss-nested'),
        require('autoprefixer'),
        require('postcss-preset-env', {
          stage: 3,
          features: {},
        }),
        require('postcss-custom-selectors', {
          importFrom: 'src/css/custom-selectors.css',
        }),
        require('postcss-custom-media', {
          importFrom: 'src/css/custom-media.css',
        }),
      ]
    },
  }
})
