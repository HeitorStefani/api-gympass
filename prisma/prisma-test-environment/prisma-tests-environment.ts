import type { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    console.log('Setting up custom environment')
    return {
      teardown() {
        console.log('Tearing down custom environment')
      },
    }
  },
}
