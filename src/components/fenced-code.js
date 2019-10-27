import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import { normalizeComponent, createInjectorShadow } from 'vue-runtime-helpers'

var script = {
  props: {
    loc: {
      type: Number,
      required: true,
    },
    highlights: {
      type: [Array, String],
    },
    lang: {
      type: String,
      default: 'text',
    },
    code: {
      type: String,
    },
  },
  computed: {
    rawCode() {
      return this.code.replace(/\\n/g, '\n')
    },
    parsedHighlights() {
      if (this.highlights) {
        if (Array.isArray(this.highlights)) return this.highlights

        try {
          return JSON.parse(this.highlights)
        } catch {
          // noop
        }
      }

      return undefined
    },
    isHighlighted() {
      const lines = {}

      if (this.parsedHighlights) {
        this.parsedHighlights.forEach(([start, end]) => {
          if (end) {
            for (let i = start; i <= end; ++i) {
              lines[i] = true
            }
          } else {
            lines[start] = true
          }
        })
      }

      return lineNumber => lineNumber in lines
    },
  },
}

/* script */
const __vue_script__ = script

/* template */
var __vue_render__ = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c('div', { staticClass: 'fenced-code' }, [
    _c(
      'div',
      {
        staticClass: 'fenced-code-language',
        attrs: { id: 'code-snippet' + _vm._uid },
      },
      [
        _vm._v('\n    ' + _vm._s(_vm.lang.toUpperCase()) + '\n    '),
        _c('span', { staticClass: 'sr-only-no-focus' }, [
          _vm._v('  code snippet'),
        ]),
      ]
    ),
    _vm._v(' '),
    _c(
      'div',
      {
        staticClass: 'sr-only-no-focus',
        attrs: { 'aria-describedby': 'code-snippet' + _vm._uid },
      },
      [_vm._t('default')],
      2
    ),
    _vm._v(' '),
    _vm.parsedHighlights && _vm.parsedHighlights.length ? _vm._m(0) : _vm._e(),
    _vm._v(' '),
    _c('div', {
      attrs: { 'aria-hidden': 'true' },
      domProps: { innerHTML: _vm._s(_vm.rawCode) },
    }),
    _vm._v(' '),
    _vm._m(1),
  ])
}
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      'div',
      {
        staticClass: 'highlight-lines',
        attrs: { 'aria-hidden': 'true', role: 'presentation' },
      },
      _vm._l(_vm.loc - 1, function(line) {
        return _c(
          'div',
          { key: line, class: { highlighted: _vm.isHighlighted(line) } },
          [_vm._v('\n       \n    ')]
        )
      }),
      0
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      'div',
      {
        staticClass: 'line-numbers-wrapper',
        attrs: { 'aria-hidden': 'true', role: 'presentation' },
      },
      _vm._l(_vm.loc - 1, function(line) {
        return _c('div', { key: line, staticClass: 'line-number' }, [
          _vm._v('\n      ' + _vm._s(line) + '\n    '),
        ])
      }),
      0
    )
  },
]

/* style */
const __vue_inject_styles__ = function(inject) {
  if (!inject) return
  inject('data-v-072ccf90_0', {
    source:
      '@charset "UTF-8";:export{fontFacePrimary:"Noto Serif";fontFaceSecondary:Sahitya;fontFaceHeading:Inter;fontFaceCode:"Fira Mono"}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}}@media print and (prefers-color-scheme:light),print and (prefers-color-scheme:no-preference){code[class*=language-],pre[class*=language-]{text-shadow:none}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.punctuation{color:#999}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.namespace{opacity:.7}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#9a6e3a;background:hsla(0,0%,100%,.5)}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.atrule,.token.attr-value,.token.keyword{color:#07a}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.class-name,.token.function{color:#dd4a68}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.important,.token.regex,.token.variable{color:#e90}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.bold,.token.important{font-weight:700}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.italic{font-style:italic}}@media (prefers-color-scheme:light),(prefers-color-scheme:no-preference){.token.entity{cursor:help}}@media (prefers-color-scheme:dark){code[class*=language-],pre[class*=language-]{color:#fff;background:0 0;text-shadow:0 -.1em .2em #000;font-family:Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}}@media print and (prefers-color-scheme:dark){code[class*=language-],pre[class*=language-]{text-shadow:none}}@media (prefers-color-scheme:dark){:not(pre)>code[class*=language-],pre[class*=language-]{background:#4c3f33}}@media (prefers-color-scheme:dark){pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border:.3em solid #7a6651;border-radius:.5em;box-shadow:1px 1px .5em #000 inset}}@media (prefers-color-scheme:dark){:not(pre)>code[class*=language-]{padding:.15em .2em .05em;border-radius:.3em;border:.13em solid #7a6651;box-shadow:1px 1px .3em -.1em #000 inset;white-space:normal}}@media (prefers-color-scheme:dark){.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#997f66}}@media (prefers-color-scheme:dark){.token.punctuation{opacity:.7}}@media (prefers-color-scheme:dark){.namespace{opacity:.7}}@media (prefers-color-scheme:dark){.token.boolean,.token.constant,.token.number,.token.property,.token.symbol,.token.tag{color:#d1939e}}@media (prefers-color-scheme:dark){.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#bce051}}@media (prefers-color-scheme:dark){.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f4b73d}}@media (prefers-color-scheme:dark){.token.atrule,.token.attr-value,.token.keyword{color:#d1939e}}@media (prefers-color-scheme:dark){.token.important,.token.regex{color:#e90}}@media (prefers-color-scheme:dark){.token.bold,.token.important{font-weight:700}}@media (prefers-color-scheme:dark){.token.italic{font-style:italic}}@media (prefers-color-scheme:dark){.token.entity{cursor:help}}@media (prefers-color-scheme:dark){.token.deleted{color:red}}.fenced-code{--code-color:rgba(0, 0, 0, 0.7);--code-background:#f7f5f2;--code-border:black;--code-line-number:rgba(0, 0, 0, 0.7);position:relative;background-color:var(--code-background);border-radius:.25rem;border:1px solid var(--code-border);margin-top:-1px;margin-bottom:calc(2rem - 1px)}.fenced-code pre{font-size:1.125rem;line-height:2rem;padding-top:2px;padding-bottom:6px;color:var(--code-color);background:0 0;position:relative;border:none;z-index:1;vertical-align:middle;overflow:auto;margin:1rem 0 1rem 2.5rem;padding-left:0;padding-right:.5rem;box-shadow:none;text-shadow:0 1px #fff}.fenced-code pre span{background:0 0}@media (prefers-color-scheme:dark){.fenced-code pre{text-shadow:0 1px #000}}@media (prefers-color-scheme:dark){.fenced-code{--code-color:rgba(255, 255, 255, 0.97);--code-background:black;--code-border:#f7f5f2;--code-line-number:rgba(255, 255, 255, 0.97)}}.fenced-code .fenced-code-language{position:absolute;z-index:3;top:-.25em;right:.35em;font-size:.75em;color:var(--code-color);font-family:"Fira Mono",monospace}.fenced-code:after{content:"";position:absolute;z-index:2;top:0;left:0;width:2rem;height:100%;border-radius:6px 0 0 6px;border-right:1px solid var(--code-border);background-color:var(--code-background)}.highlight-lines{user-select:none;margin-top:1rem;position:absolute;top:0;left:0;right:0;padding-left:calc(2rem + 1px);z-index:4;font-size:1.125rem;line-height:2rem;padding-top:2px;padding-bottom:6px;--highlight-overlay:rgba(255, 255, 255, 0.75)}@media (prefers-color-scheme:dark){.highlight-lines{--highlight-overlay:rgba(0, 0, 0, 0.75)}}.highlight-lines>div{background-color:var(--highlight-overlay)}.highlight-lines>div:before{content:" ";position:absolute;z-index:3;left:0;display:block;width:2rem;height:2rem;background-color:var(--highlight-overlay)}.highlight-lines .highlighted{position:relative;background-color:transparent}.highlight-lines .highlighted:before{display:none}.line-numbers-wrapper{position:absolute;top:0;width:2rem;text-align:center;color:var(--code-line-number);background:var(--color-background);margin:1rem 0;z-index:3;font-size:1.125rem;line-height:2rem;padding-top:2px;padding-bottom:6px}.line-numbers-wrapper .line-number{user-select:none;position:relative;z-index:4;font-size:.75rem}.sr-only-no-focus{border:0!important;clip:rect(1px,1px,1px,1px)!important;-webkit-clip-path:inset(50%)!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;width:1px!important;white-space:nowrap!important}code{font-family:"Fira Mono",monospace;line-height:1}',
    map: undefined,
    media: undefined,
  })
}
/* scoped */
const __vue_scope_id__ = undefined
/* module identifier */
const __vue_module_identifier__ = undefined
/* functional template */
const __vue_is_functional_template__ = false

var FencedCode = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  true,
  undefined,
  undefined,
  createInjectorShadow
)

window.customElements.define('fenced-code', wrap(Vue, FencedCode))
