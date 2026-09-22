import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // 👈 Fuerza a que busque los estilos en la carpeta actual
  build: {
    assetsDir: 'assets', // Agrupa los estilos CSS correctamente
  }
})
