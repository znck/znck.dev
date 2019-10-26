import alias from 'rollup-plugin-alias'
import scss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import * as path from 'path'

export default {
  input: 'src/components/fenced-code.wc.js',
  output: {
    format: 'esm',
    file: 'src/components/fenced-code.js',
  },
  plugins: [
    alias({
      entries: { '@design': path.resolve(__dirname, 'src/design/_index.scss') },
    }),
    vue({ isWebComponent: true, styleInjectorShadow: '~vue-runtime-helpers/dist/inject-style/shadow.mjs' }),
    scss({ inject: false }),
  ],
  external: [
    'vue',
    '@vue/web-component-wrapper',
    'vue-runtime-helpers/dist/normalize-component.mjs',
    'vue-runtime-helpers/dist/inject-style/shadow.mjs',
  ],
}
