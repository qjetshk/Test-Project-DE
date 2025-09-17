import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content, context) => {
          // Безопасная проверка
          if (context && context.resourcePath && context.resourcePath.includes('main.scss') && context.resourcePath.includes('variables.scss')) {
            return content
          }
          return `@import "/src/styles/utils/variables.scss"; ${content}`
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})