import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import removeConsole from "vite-plugin-remove-console"

// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild, isPreview  }) => {

  const modoProduccion = mode == "production"
  const modoDesarrollo = !modoProduccion

  const config = {
  base:'./',
  plugins: [react(), modoProduccion && removeConsole(),],
  build: {
    emptyOutDir: true,
    sourcemap: modoDesarrollo ? "inline" : false,
    minify: modoDesarrollo ? false : "esbuild",
  },
  }

  return config
})
