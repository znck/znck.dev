import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs'
import __vue_create_injector_shadow__ from 'vue-runtime-helpers/dist/inject-style/shadow.mjs'

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
  return _c(
    'div',
    { staticClass: 'fenced-code' },
    [
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
      _vm.parsedHighlights && _vm.parsedHighlights.length
        ? _vm._m(0)
        : _vm._e(),
      _vm._v(' '),
      _vm._v(
        '"\n    v-once\n    aria-hidden="true"\n    role="presentatio\n      ' +
          _vm._s(_vm.line) +
          '\n         '
      ),
      _vm._l(_vm.loc - 1, function(line) {
        return _c('div', { key: line, staticClass: 'line-number' }, [
          _vm._v('\n      ' + _vm._s(line) + '\n    '),
        ])
      }),
    ],
    2
  )
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
          [_vm._v('\n       \n    hlighted(line) }"\n    >\n       \n    ')]
        )
      }),
      0
    )
  },
]
__vue_render__._withStripped = true

/* style */
const __vue_inject_styles__ = function(inject) {
  if (!inject) return
  inject('data-v-3fbfe920_0', {
    source:
      '@charset "UTF-8";\n:export {\n  fontFacePrimary: "Noto Serif";\n  fontFaceSecondary: "Sahitya";\n  fontFaceHeading: "Inter";\n  fontFaceCode: "Fira Mono";\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  /**\n   * prism.js default theme for JavaScript, CSS and HTML\n   * Based on dabblet (http://dabblet.com)\n   * @author Lea Verou\n   */\ncode[class*=language-],\npre[class*=language-] {\n    color: black;\n    background: none;\n    text-shadow: 0 1px white;\n    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n}\npre[class*=language-]::-moz-selection, pre[class*=language-] ::-moz-selection,\ncode[class*=language-]::-moz-selection, code[class*=language-] ::-moz-selection {\n    text-shadow: none;\n    background: #b3d4fc;\n}\npre[class*=language-]::selection, pre[class*=language-] ::selection,\ncode[class*=language-]::selection, code[class*=language-] ::selection {\n    text-shadow: none;\n    background: #b3d4fc;\n}\n\n  /* Code blocks */\n\n  /* Inline code */\n}\n@media print and (prefers-color-scheme: light), print and (prefers-color-scheme: no-preference) {\ncode[class*=language-],\npre[class*=language-] {\n    text-shadow: none;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\npre[class*=language-] {\n    padding: 1em;\n    margin: 0.5em 0;\n    overflow: auto;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n:not(pre) > code[class*=language-],\npre[class*=language-] {\n    background: #f5f2f0;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n:not(pre) > code[class*=language-] {\n    padding: 0.1em;\n    border-radius: 0.3em;\n    white-space: normal;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n    color: slategray;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.punctuation {\n    color: #999;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.namespace {\n    opacity: 0.7;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n    color: #905;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n    color: #690;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n    color: #9a6e3a;\n    background: hsla(0, 0%, 100%, 0.5);\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n    color: #07a;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.function,\n.token.class-name {\n    color: #DD4A68;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.regex,\n.token.important,\n.token.variable {\n    color: #e90;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.important,\n.token.bold {\n    font-weight: bold;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.italic {\n    font-style: italic;\n}\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n.token.entity {\n    cursor: help;\n}\n}\n@media (prefers-color-scheme: dark) {\n  /**\n   * prism.js Dark theme for JavaScript, CSS and HTML\n   * Based on the slides of the talk “/Reg(exp){2}lained/”\n   * @author Lea Verou\n   */\ncode[class*=language-],\npre[class*=language-] {\n    color: white;\n    background: none;\n    text-shadow: 0 -0.1em 0.2em black;\n    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n}\n\n  /* Code blocks */\n\n  /* Inline code */\n}\n@media print and (prefers-color-scheme: dark) {\ncode[class*=language-],\npre[class*=language-] {\n    text-shadow: none;\n}\n}\n@media (prefers-color-scheme: dark) {\npre[class*=language-],\n:not(pre) > code[class*=language-] {\n    background: hsl(30, 20%, 25%);\n}\n}\n@media (prefers-color-scheme: dark) {\npre[class*=language-] {\n    padding: 1em;\n    margin: 0.5em 0;\n    overflow: auto;\n    border: 0.3em solid hsl(30, 20%, 40%);\n    border-radius: 0.5em;\n    box-shadow: 1px 1px 0.5em black inset;\n}\n}\n@media (prefers-color-scheme: dark) {\n:not(pre) > code[class*=language-] {\n    padding: 0.15em 0.2em 0.05em;\n    border-radius: 0.3em;\n    border: 0.13em solid hsl(30, 20%, 40%);\n    box-shadow: 1px 1px 0.3em -0.1em black inset;\n    white-space: normal;\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n    color: hsl(30, 20%, 50%);\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.punctuation {\n    opacity: 0.7;\n}\n}\n@media (prefers-color-scheme: dark) {\n.namespace {\n    opacity: 0.7;\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol {\n    color: hsl(350, 40%, 70%);\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n    color: hsl(75, 70%, 60%);\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n    color: hsl(40, 90%, 60%);\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n    color: hsl(350, 40%, 70%);\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.regex,\n.token.important {\n    color: #e90;\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.important,\n.token.bold {\n    font-weight: bold;\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.italic {\n    font-style: italic;\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.entity {\n    cursor: help;\n}\n}\n@media (prefers-color-scheme: dark) {\n.token.deleted {\n    color: red;\n}\n}\n.fenced-code {\n  --code-color: rgba(0, 0, 0, 0.7);\n  --code-background: #f7f5f2;\n  --code-border: black;\n  --code-line-number: rgba(0, 0, 0, 0.7);\n  position: relative;\n  background-color: var(--code-background);\n  border-radius: 0.25rem;\n  border: 1px solid var(--code-border);\n  margin-top: -1px;\n  margin-bottom: calc(2rem - 1px);\n}\n.fenced-code pre {\n  font-size: 1.125rem;\n  line-height: 2rem;\n  padding-top: 2px;\n  padding-bottom: 6px;\n  color: var(--code-color);\n  background: transparent;\n  position: relative;\n  border: none;\n  z-index: 1;\n  vertical-align: middle;\n  overflow: auto;\n  margin: 1rem 0 1rem 2.5rem;\n  padding-left: 0;\n  padding-right: 0.5rem;\n  box-shadow: none;\n  text-shadow: 0 1px white;\n}\n.fenced-code pre span {\n  background: transparent;\n}\n@media (prefers-color-scheme: dark) {\n.fenced-code pre {\n    text-shadow: 0 1px black;\n}\n}\n@media (prefers-color-scheme: dark) {\n.fenced-code {\n    --code-color: rgba(255, 255, 255, 0.97);\n    --code-background: black;\n    --code-border: #f7f5f2;\n    --code-line-number: rgba(255, 255, 255, 0.97);\n}\n}\n.fenced-code .fenced-code-language {\n  position: absolute;\n  z-index: 3;\n  top: -0.25em;\n  right: 0.35em;\n  font-size: 0.75em;\n  color: var(--code-color);\n  font-family: "Fira Mono", monospace;\n}\n.fenced-code:after {\n  content: "";\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  left: 0;\n  width: 2rem;\n  height: 100%;\n  border-radius: 6px 0 0 6px;\n  border-right: 1px solid var(--code-border);\n  background-color: var(--code-background);\n}\n.highlight-lines {\n  user-select: none;\n  margin-top: 1rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding-left: calc(2rem + 1px);\n  z-index: 4;\n  font-size: 1.125rem;\n  line-height: 2rem;\n  padding-top: 2px;\n  padding-bottom: 6px;\n  --highlight-overlay: rgba(255, 255, 255, 0.75);\n}\n@media (prefers-color-scheme: dark) {\n.highlight-lines {\n    --highlight-overlay: rgba(0, 0, 0, 0.75);\n}\n}\n.highlight-lines > div {\n  background-color: var(--highlight-overlay);\n}\n.highlight-lines > div:before {\n  content: " ";\n  position: absolute;\n  z-index: 3;\n  left: 0;\n  display: block;\n  width: 2rem;\n  height: 2rem;\n  background-color: var(--highlight-overlay);\n}\n.highlight-lines .highlighted {\n  position: relative;\n  background-color: transparent;\n}\n.highlight-lines .highlighted:before {\n  display: none;\n}\n.line-numbers-wrapper {\n  position: absolute;\n  top: 0;\n  width: 2rem;\n  text-align: center;\n  color: var(--code-line-number);\n  background: var(--color-background);\n  margin: 1rem 0;\n  z-index: 3;\n  font-size: 1.125rem;\n  line-height: 2rem;\n  padding-top: 2px;\n  padding-bottom: 6px;\n}\n.line-numbers-wrapper .line-number {\n  user-select: none;\n  position: relative;\n  z-index: 4;\n  font-size: 0.75rem;\n}\n.sr-only-no-focus {\n  border: 0 !important;\n  clip: rect(1px, 1px, 1px, 1px) !important;\n  /* 1 */\n  -webkit-clip-path: inset(50%) !important;\n  clip-path: inset(50%) !important;\n  /* 2 */\n  height: 1px !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important;\n  white-space: nowrap !important;\n  /* 3 */\n}\ncode {\n  font-family: "Fira Mono", monospace;\n  line-height: 1;\n}\n\n/*# sourceMappingURL=fenced-code.vue.map */',
    map: {
      version: 3,
      sources: [
        'fenced-code.vue',
        '/Users/znck/Workspace/znck/znck.dev/src/components/fenced-code.vue',
      ],
      names: [],
      mappings:
        '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',
      file: 'fenced-code.vue',
      sourcesContent: [
        '@charset "UTF-8";\n:export {\n  fontFacePrimary: "Noto Serif";\n  fontFaceSecondary: "Sahitya";\n  fontFaceHeading: "Inter";\n  fontFaceCode: "Fira Mono";\n}\n\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  /**\n   * prism.js default theme for JavaScript, CSS and HTML\n   * Based on dabblet (http://dabblet.com)\n   * @author Lea Verou\n   */\n  code[class*=language-],\npre[class*=language-] {\n    color: black;\n    background: none;\n    text-shadow: 0 1px white;\n    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  pre[class*=language-]::-moz-selection, pre[class*=language-] ::-moz-selection,\ncode[class*=language-]::-moz-selection, code[class*=language-] ::-moz-selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  pre[class*=language-]::selection, pre[class*=language-] ::selection,\ncode[class*=language-]::selection, code[class*=language-] ::selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  /* Code blocks */\n\n  /* Inline code */\n}\n@media print and (prefers-color-scheme: light), print and (prefers-color-scheme: no-preference) {\n  code[class*=language-],\npre[class*=language-] {\n    text-shadow: none;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  pre[class*=language-] {\n    padding: 1em;\n    margin: 0.5em 0;\n    overflow: auto;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  :not(pre) > code[class*=language-],\npre[class*=language-] {\n    background: #f5f2f0;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  :not(pre) > code[class*=language-] {\n    padding: 0.1em;\n    border-radius: 0.3em;\n    white-space: normal;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n    color: slategray;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.punctuation {\n    color: #999;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .namespace {\n    opacity: 0.7;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n    color: #905;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n    color: #690;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n    color: #9a6e3a;\n    background: hsla(0, 0%, 100%, 0.5);\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.atrule,\n.token.attr-value,\n.token.keyword {\n    color: #07a;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.function,\n.token.class-name {\n    color: #DD4A68;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.regex,\n.token.important,\n.token.variable {\n    color: #e90;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.important,\n.token.bold {\n    font-weight: bold;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.italic {\n    font-style: italic;\n  }\n}\n@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {\n  .token.entity {\n    cursor: help;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  /**\n   * prism.js Dark theme for JavaScript, CSS and HTML\n   * Based on the slides of the talk “/Reg(exp){2}lained/”\n   * @author Lea Verou\n   */\n  code[class*=language-],\npre[class*=language-] {\n    color: white;\n    background: none;\n    text-shadow: 0 -0.1em 0.2em black;\n    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  /* Code blocks */\n\n  /* Inline code */\n}\n@media print and (prefers-color-scheme: dark) {\n  code[class*=language-],\npre[class*=language-] {\n    text-shadow: none;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  pre[class*=language-],\n:not(pre) > code[class*=language-] {\n    background: hsl(30, 20%, 25%);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  pre[class*=language-] {\n    padding: 1em;\n    margin: 0.5em 0;\n    overflow: auto;\n    border: 0.3em solid hsl(30, 20%, 40%);\n    border-radius: 0.5em;\n    box-shadow: 1px 1px 0.5em black inset;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  :not(pre) > code[class*=language-] {\n    padding: 0.15em 0.2em 0.05em;\n    border-radius: 0.3em;\n    border: 0.13em solid hsl(30, 20%, 40%);\n    box-shadow: 1px 1px 0.3em -0.1em black inset;\n    white-space: normal;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n    color: hsl(30, 20%, 50%);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.punctuation {\n    opacity: 0.7;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .namespace {\n    opacity: 0.7;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol {\n    color: hsl(350, 40%, 70%);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n    color: hsl(75, 70%, 60%);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n    color: hsl(40, 90%, 60%);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.atrule,\n.token.attr-value,\n.token.keyword {\n    color: hsl(350, 40%, 70%);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.regex,\n.token.important {\n    color: #e90;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.important,\n.token.bold {\n    font-weight: bold;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.italic {\n    font-style: italic;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.entity {\n    cursor: help;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .token.deleted {\n    color: red;\n  }\n}\n.fenced-code {\n  --code-color: rgba(0, 0, 0, 0.7);\n  --code-background: #f7f5f2;\n  --code-border: black;\n  --code-line-number: rgba(0, 0, 0, 0.7);\n  position: relative;\n  background-color: var(--code-background);\n  border-radius: 0.25rem;\n  border: 1px solid var(--code-border);\n  margin-top: -1px;\n  margin-bottom: calc(2rem - 1px);\n}\n.fenced-code pre {\n  font-size: 1.125rem;\n  line-height: 2rem;\n  padding-top: 2px;\n  padding-bottom: 6px;\n  color: var(--code-color);\n  background: transparent;\n  position: relative;\n  border: none;\n  z-index: 1;\n  vertical-align: middle;\n  overflow: auto;\n  margin: 1rem 0 1rem 2.5rem;\n  padding-left: 0;\n  padding-right: 0.5rem;\n  box-shadow: none;\n  text-shadow: 0 1px white;\n}\n.fenced-code pre span {\n  background: transparent;\n}\n@media (prefers-color-scheme: dark) {\n  .fenced-code pre {\n    text-shadow: 0 1px black;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .fenced-code {\n    --code-color: rgba(255, 255, 255, 0.97);\n    --code-background: black;\n    --code-border: #f7f5f2;\n    --code-line-number: rgba(255, 255, 255, 0.97);\n  }\n}\n.fenced-code .fenced-code-language {\n  position: absolute;\n  z-index: 3;\n  top: -0.25em;\n  right: 0.35em;\n  font-size: 0.75em;\n  color: var(--code-color);\n  font-family: "Fira Mono", monospace;\n}\n.fenced-code:after {\n  content: "";\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  left: 0;\n  width: 2rem;\n  height: 100%;\n  border-radius: 6px 0 0 6px;\n  border-right: 1px solid var(--code-border);\n  background-color: var(--code-background);\n}\n\n.highlight-lines {\n  user-select: none;\n  margin-top: 1rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding-left: calc(2rem + 1px);\n  z-index: 4;\n  font-size: 1.125rem;\n  line-height: 2rem;\n  padding-top: 2px;\n  padding-bottom: 6px;\n  --highlight-overlay: rgba(255, 255, 255, 0.75);\n}\n@media (prefers-color-scheme: dark) {\n  .highlight-lines {\n    --highlight-overlay: rgba(0, 0, 0, 0.75);\n  }\n}\n.highlight-lines > div {\n  background-color: var(--highlight-overlay);\n}\n.highlight-lines > div:before {\n  content: " ";\n  position: absolute;\n  z-index: 3;\n  left: 0;\n  display: block;\n  width: 2rem;\n  height: 2rem;\n  background-color: var(--highlight-overlay);\n}\n.highlight-lines .highlighted {\n  position: relative;\n  background-color: transparent;\n}\n.highlight-lines .highlighted:before {\n  display: none;\n}\n\n.line-numbers-wrapper {\n  position: absolute;\n  top: 0;\n  width: 2rem;\n  text-align: center;\n  color: var(--code-line-number);\n  background: var(--color-background);\n  margin: 1rem 0;\n  z-index: 3;\n  font-size: 1.125rem;\n  line-height: 2rem;\n  padding-top: 2px;\n  padding-bottom: 6px;\n}\n.line-numbers-wrapper .line-number {\n  user-select: none;\n  position: relative;\n  z-index: 4;\n  font-size: 0.75rem;\n}\n\n.sr-only-no-focus {\n  border: 0 !important;\n  clip: rect(1px, 1px, 1px, 1px) !important;\n  /* 1 */\n  -webkit-clip-path: inset(50%) !important;\n  clip-path: inset(50%) !important;\n  /* 2 */\n  height: 1px !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important;\n  white-space: nowrap !important;\n  /* 3 */\n}\n\ncode {\n  font-family: "Fira Mono", monospace;\n  line-height: 1;\n}\n\n/*# sourceMappingURL=fenced-code.vue.map */',
        '<script>\nexport default {\n  props: {\n    loc: {\n      type: Number,\n      required: true,\n    },\n    highlights: {\n      type: [Array, String],\n    },\n    lang: {\n      type: String,\n      default: \'text\',\n    },\n    code: {\n      type: String,\n    },\n  },\n  computed: {\n    rawCode() {\n      return this.code.replace(/\\\\n/g, \'\\n\')\n    },\n    parsedHighlights() {\n      if (this.highlights) {\n        if (Array.isArray(this.highlights)) return this.highlights\n\n        try {\n          return JSON.parse(this.highlights)\n        } catch {\n          // noop\n        }\n      }\n\n      return undefined\n    },\n    isHighlighted() {\n      const lines = {}\n\n      if (this.parsedHighlights) {\n        this.parsedHighlights.forEach(([start, end]) => {\n          if (end) {\n            for (let i = start; i <= end; ++i) {\n              lines[i] = true\n            }\n          } else {\n            lines[start] = true\n          }\n        })\n      }\n\n      return lineNumber => lineNumber in lines\n    },\n  },\n}\n</script>\n\n<template>\n  <div class="fenced-code">\n    <div class="fenced-code-language" :id="`code-snippet${_uid}`">\n      {{ lang.toUpperCase() }}\n      <span class="sr-only-no-focus">&nbsp; code snippet</span>\n    </div>\n    <div class="sr-only-no-focus" :aria-describedby="`code-snippet${_uid}`">\n      <slot />\n    </div>\n    <div\n      class="highlight-lines"\n      v-if="parsedHighlights && parsedHighlights.length"\n      aria-hidden="true"\n      role="presentation"\n      v-once\n    >\n      <div\n        v-for="line in loc - 1"\n        :key="line"\n        :class="{ highlighted: isHighlighted(line) }"\n      >\n        &nbsp;\n      hlighted(line) }"\n      >\n        &nbsp;\n      </div>\n    </div>\n    <div \n      class="line-numbers-wrapper"\n      v-once\n      aria-hidden="true"\n      role="presentation"\n    rapper"\n      v-once\n      aria-hidden="true"\n      role="presentatio\n        {{ line }}\n           <div class="line-number" v-for="line in loc - 1" :key="line">\n        {{ line }}\n      </div>\n    </div>\n  </div>\n</template>\n\n<style lang="scss">\n@import \'../design/_index.scss\';\n\n@include light-mode() {\n  @import \'../../node_modules/prismjs/themes/prism\';\n}\n\n@include dark-mode() {\n  @import \'../../node_modules/prismjs/themes/prism-dark\';\n}\n\n.fenced-code {\n  --code-color: #{text-color(\'dark\')};\n  --code-background: #{background-color(\'light\')};\n  --code-border: #{background-color(\'dark\')};\n  --code-line-number: #{text-color(\'dark\')};\n  position: relative;\n  background-color: var(--code-background);\n  border-radius: 0.25rem;\n  border: 1px solid var(--code-border);\n  margin-top: -1px;\n  margin-bottom: calc(2rem - 1px);\n\n  pre {\n    @include font(\'code\');\n\n    color: var(--code-color);\n    background: transparent;\n    position: relative;\n    border: none;\n    z-index: 1;\n    vertical-align: middle;\n    overflow: auto;\n    margin: 1rem 0 1rem 2.5rem;\n    padding-left: 0;\n    padding-right: 0.5rem;\n    box-shadow: none;\n    text-shadow: 0 1px white;\n\n    span {\n      background: transparent;\n    }\n\n    @include dark-mode() {\n      text-shadow: 0 1px black;\n    }\n  }\n\n  @include dark-mode() {\n    --code-color: #{text-color(\'light\')};\n    --code-background: #{background-color(\'dark\')};\n    --code-border: #{background-color(\'light\')};\n    --code-line-number: #{text-color(\'light\')};\n  }\n\n  .fenced-code-language {\n    position: absolute;\n    z-index: 3;\n    top: -0.25em;\n    right: 0.35em;\n    font-size: 0.75em;\n    color: var(--code-color);\n    font-family: font-family(\'code\');\n  }\n\n  &:after {\n    content: \'\';\n    position: absolute;\n    z-index: 2;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 100%;\n    border-radius: 6px 0 0 6px;\n    border-right: 1px solid var(--code-border);\n    background-color: var(--code-background);\n  }\n}\n\n.highlight-lines {\n  user-select: none;\n  margin-top: 1rem;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding-left: calc(2rem + 1px);\n  z-index: 4;\n  @include font(\'code\');\n\n  --highlight-overlay: rgba(255, 255, 255, 0.75);\n  @include dark-mode() {\n    --highlight-overlay: rgba(0, 0, 0, 0.75);\n  }\n\n  > div {\n    background-color: var(--highlight-overlay);\n\n    &:before {\n      content: \' \';\n      position: absolute;\n      z-index: 3;\n      left: 0;\n      display: block;\n      width: 2rem;\n      height: 2rem;\n      background-color: var(--highlight-overlay);\n    }\n  }\n\n  .highlighted {\n    position: relative;\n    background-color: transparent;\n\n    &:before {\n      display: none;\n    }\n  }\n}\n\n.line-numbers-wrapper {\n  position: absolute;\n  top: 0;\n  width: 2rem;\n  text-align: center;\n  color: var(--code-line-number);\n  background: var(--color-background);\n  margin: 1rem 0;\n  z-index: 3;\n  @include font(\'code\');\n\n  .line-number {\n    user-select: none;\n    position: relative;\n    z-index: 4;\n    font-size: 0.75rem;\n  }\n}\n\n.sr-only-no-focus {\n  border: 0 !important;\n  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */\n  -webkit-clip-path: inset(50%) !important;\n  clip-path: inset(50%) !important; /* 2 */\n  height: 1px !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important;\n  white-space: nowrap !important; /* 3 */\n}\n\ncode {\n  font-family: font-family(\'code\');\n  line-height: 1; // Remove 1px added in paragraph height.\n}\n</style>\n',
      ],
    },
    media: undefined,
  })
}
/* scoped */
const __vue_scope_id__ = undefined
/* module identifier */
const __vue_module_identifier__ = undefined
/* functional template */
const __vue_is_functional_template__ = false

var FencedCode = __vue_normalize__(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  true,
  undefined,
  undefined,
  __vue_create_injector_shadow__
)

window.customElements.define('fenced-code', wrap(Vue, FencedCode))
