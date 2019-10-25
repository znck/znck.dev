// forked from: https://github.com/arve0/markdown-it-implicit-figures/blob/master/index.js

module.exports = function implicitFiguresPlugin(md, options) {
  options = { dataType: true, figcaption: true, copyAttrs: /^(?!alt|src).+/, ...options }
  function implicitFigures(state) {
    // do not process first and last token
    for (let i = 1, l = state.tokens.length; i < l - 1; ++i) {
      let token = state.tokens[i]

      if (token.type !== 'inline') {
        continue
      }
      // children: image alone, or link_open -> image -> link_close
      if (!token.children || (token.children.length !== 1 && token.children.length !== 3)) {
        continue
      }
      // one child, should be img
      if (token.children.length === 1 && token.children[0].type !== 'image') {
        continue
      }
      // three children, should be image enclosed in link
      if (
        token.children.length === 3 &&
        (token.children[0].type !== 'link_open' ||
          token.children[1].type !== 'image' ||
          token.children[2].type !== 'link_close')
      ) {
        continue
      }
      // prev token is paragraph open
      if (i !== 0 && state.tokens[i - 1].type !== 'paragraph_open') {
        continue
      }
      // next token is paragraph close
      if (i !== l - 1 && state.tokens[i + 1].type !== 'paragraph_close') {
        continue
      }

      // We have inline token containing an image only.
      // Previous token is paragraph open.
      // Next token is paragraph close.
      // Lets replace the paragraph tokens with figure tokens.
      const figure = state.tokens[i - 1]
      figure.type = 'figure_open'
      figure.tag = 'figure'
      state.tokens[i + 1].type = 'figure_close'
      state.tokens[i + 1].tag = 'figure'

      // for linked images, image is one off
      const image = token.children.length === 1 ? token.children[0] : token.children[1]

      if (options.figcaption == true) {
        if (image.children && image.children.length) {
          token.children.push(new state.Token('figcaption_open', 'figcaption', 1))
          token.children.splice(token.children.length, 0, ...image.children)
          token.children.push(new state.Token('figcaption_close', 'figcaption', -1))
        }
      }

      figure.attrs = []

      if (options.copyAttrs && image.attrs) {
        const f = options.copyAttrs === true ? '' : options.copyAttrs
        figure.attrs = image.attrs.filter(([k]) => k.match(f))
      }

      if (options.dataType == true) {
        figure.attrs.push(['data-type', 'image'])
      }
    }
  }
  md.core.ruler.before('linkify', 'implicit_figures', implicitFigures)
}
