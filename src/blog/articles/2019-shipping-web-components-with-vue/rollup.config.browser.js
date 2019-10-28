import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './my-component-wrapper.js',
  output: {
    format: 'umd',
    file: './my-component.umd.js',
    sourcemap: false,
    globals: { vue: 'Vue' },
  },
  plugins: [
    vue({ isWebComponent: true, template: { isProduction: true } }),
    resolve(),
  ],
  external: ['vue'],
}
