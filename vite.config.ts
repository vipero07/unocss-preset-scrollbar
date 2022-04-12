import { defineConfig } from 'vite'
import { presetUno, presetAttributify } from 'unocss'
import { presetScrollbar } from './src'
import unocss from 'unocss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetScrollbar(),
      ],
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es','cjs'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['unocss'],
    },
  },
}))