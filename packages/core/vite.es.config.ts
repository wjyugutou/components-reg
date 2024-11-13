import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// 生成.d.ts 文件
import dts from 'vite-plugin-dts'

function generatorComponents(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',

    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'YugutouUI',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome', '@popperjs/core', 'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          // names 为undefined
          if (assetInfo.name === 'style.css')
            return 'index.css'
          return assetInfo.name as string
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/utils')) {
            return 'utils'
          }
          if (id.includes('/packages/composables')) {
            return 'composables'
          }
          for (const comName of generatorComponents('../components')) {
            if (id.includes(`/packages/components/${comName}`)) {
              return comName
            }
          }
        },
      },
    },
  },
})
