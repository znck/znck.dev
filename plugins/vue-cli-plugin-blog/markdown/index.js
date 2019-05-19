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
  function MDV({ hoist, figures, links, ...options } = {}) {
    const md = new MarkdownIt({ ...options, html: true })

    md.use(require('./plugins/hoist-tags'), hoist)
      .use(require('markdown-it-attrs'))
      .use(require('./plugins/figure'), figures)
      .use(require('markdown-it-highlightjs'))
      .use(require('markdown-it-external-links'), {
        externalClassName: 'external-link',
        internalClassName: 'link',
        internalDomains: ['znck.dev'],
        externalTarget: '_blank',
        externalRel: 'noopener noreferrer',
        ...links,
      })

    return md
  }
