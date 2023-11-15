import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { dependencies, devDependencies, peerDependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es'],
      name: 'bundlers',
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
      ],
      output: {
        dir: 'dist',
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [react()],
})
