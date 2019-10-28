const Config = require('markdown-it-chain')
const EmojiPlugin = require('markdown-it-emoji')
const anchorPlugin = require('markdown-it-anchor')
const tocPlugin = require('markdown-it-table-of-contents')

const HighlightLines = require('./plugins/highlight-lines')
const Snippet = require('./plugins/snippet')
const Figure = require('./plugins/figure')
const Component = require('./plugins/component')
const RouterLink = require('./plugins/router-link')

const highlight = require('./highlight')

/**
 * @typedef Options
 * @property {import('./plugins/hoist-tags').Options} [hoist]
 */

module.exports =
  /**
   * Create md to vue convertor.
   * @param {import('markdown-it').Options & Options} options
   */
  function MDV({ externalLinks = [], root } = {}) {
    const config = new Config()

    config.options
      .html(true)
      .highlight(highlight)
      .end()

    config
      .plugin('snippet')
      .use(Snippet, [{ root }])
      .end()

    config
      .plugin('highlight-lines')
      .use(HighlightLines)
      .end()

    config
      .plugin('figure')
      .use(Figure)
      .end()

    config
      .plugin('math')
      .use(require('markdown-it-math'))
      .end()

    config
      .plugin('router-link')
      .use(RouterLink, [
        Object.assign(
          {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          externalLinks
        ),
      ])
      .end()

    config
      .plugin('component')
      .use(Component)
      .end()

    config
      .plugin('anchor')
      .use(anchorPlugin, [
        {
          level: [2, 3],
          permalink: true,
          permalinkBefore: false,
          permalinkSpace: false,
          permalinkClass: 'heading-permalink',
          renderPermalink: (slug, opts, state, idx) => {
            const linkTokens = [
              Object.assign(new state.Token('link_open', 'a', 1), {
                attrs: [
                  ['class', opts.permalinkClass],
                  ['href', opts.permalinkHref(slug, state)],
                  ['aria-labelledby', slug],
                  ['tabindex', '-1'],
                  ['aria-hidden', 'true'],
                ],
              }),
              Object.assign(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }),
              new state.Token('link_close', 'a', -1),
            ]

            // `push` or `unshift` according to position option.
            // Space is at the opposite side.

            state.tokens[idx + 1].children.push(...linkTokens)
          },
        },
      ])
      .end()

    config.plugin('emoji').use(EmojiPlugin)

    config
      .plugin('toc')
      .use(tocPlugin, [
        {
          includeLevel: [2, 3],
        },
      ])
      .end()

    config
      .plugin('attrs')
      .use(require('markdown-it-attrs'))
      .end()

    return config.toMd(require('markdown-it'))
  }
