import vue from 'rollup-plugin-vue'

export default {
  input: './my-component-wrapper.js',
  output: {
    format: 'esm',
    file: './my-component.esm.js',
    sourcemap: false,
  },
  plugins: [vue({ isWebComponent: true, template: { isProduction: true } })],
  external: ['vue', 'vue-runtime-helpers', '@vue/web-component-wrapper'],
}
