import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'YugutouUI',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          // names 为undefined
          if (assetInfo.name === 'style.css')
            return 'index.css'
          return assetInfo.name as string
        },
      },
    },
  },
})
