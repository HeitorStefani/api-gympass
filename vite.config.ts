import { defineConfig } from 'vitest/config'

// Use dynamic import for vite-tsconfig-paths
export default defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default

  return {
    plugins: [tsconfigPaths()],
  }
})
