const MarkdownIt = require('markdown-it')

/**
 * @typedef Options
 * @property {import('./plugins/hoist-tags').Options} [hoist]
 */

module.exports =
  /**
   * Create md to vue convertor.
   * @param {import('markdown-it').Options & Options} options
   */
function MDV({ hoist, figures, ...options } = {}) {
    const md = new MarkdownIt({ ...options, html: true })

    md.use(require('./plugins/hoist-tags'), hoist)
      .use(require('markdown-it-attrs'))
      .use(require('./plugins/figure'), figures)
      .use(require('markdown-it-highlightjs'))

    return md
  }
