import { defineWorkspace } from 'vitest/config'
import { resolve } from 'path'

export default defineWorkspace([
  {
    // Configurações para testes unitários
    root: '.',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    test: {
      name: 'unit', // Mova a propriedade name para dentro do objeto test
      include: ['src/services/test/**/*.spec.ts'],
      environment: 'node',
    },
  },
  {
    // Configurações para controllers
    root: '.',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    test: {
      name: 'controllers', // Mova a propriedade name para dentro do objeto test
      include: ['src/http/controllers/test/**/*.spec.ts'],
      environment: 'node',
    },
  },
  {
    // Configurações para e2e
    root: '.',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    test: {
      name: 'e2e', // Mova a propriedade name para dentro do objeto test
      include: ['src/http/controllers/test/**/*.e2e-spec.ts'],
      environment: 'node',
    },
  },
])
