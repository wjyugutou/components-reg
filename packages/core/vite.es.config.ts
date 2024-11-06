import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const COMP_NAMES = [
  'Alert',
  'Button',
  'Collapse',
  'Dropdown',
  'Form',
  'Icon',
  'Input',
  'Loading',
  'Message',
  'MessageBox',
  'Notification',
  'Overlay',
  'Popconfirm',
  'Select',
  'Switch',
  'Tooltip',
  'Upload',
] as const

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
  ],
  build: {
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
          for (const comName of COMP_NAMES) {
            if (id.includes(`/packages/components/${comName}`)) {
              return comName
            }
          }
        },
      },
    },
  },
})
