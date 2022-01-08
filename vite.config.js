import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssCustomMedia from 'postcss-custom-media'
import postcssCustomSelectors from 'postcss-custom-selectors'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('postcss-nested'),
        require('autoprefixer'),
        postcssCustomSelectors({
          importFrom: 'src/css/custom-selectors.css',
        }),
        postcssCustomMedia({
          importFrom: 'src/css/custom-media.css',
        }),
        require('postcss-preset-env', {
          stage: 3,
          features: {},
        }),
      ],
    },
  }
})
