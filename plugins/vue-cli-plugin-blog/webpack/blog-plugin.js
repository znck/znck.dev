const fs = require('fs')
const path = require('path')
const globby = require('globby')
const prettier = require('prettier')
const { parse } = require('../md-to-vue')
const generateRSS = require('./feed-rss')

/**
 * @typedef BlogPluginOptions
 *
 * @property {string} baseUrl - Website baseUrl.
 * @property {string} articlesDir - Path to load articles from.
 * @property {string} collectionsDir - Path to load collections from.
 */

const NAME = 'BlogPlugin'

function getPrettierConfig() {
  try {
    return require(process.cwd() + '/prettier.config.js')
  } catch (e) {
    return {}
  }
}

module.exports = class BlogPlugin {
  /**
   * @param {BlogPluginOptions} options
   */
  constructor(options) {
    this.options = options
  }

  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    const to = 'src/blog/routes.js'
    const generate = () => {
      const { articlesDir, collectionsDir, baseUrl = 'https://znck.dev' } = this.options
      const articles = globby.sync(`${articlesDir}/**/*.md`)
      const collections = globby.sync(`${collectionsDir}/**/*.md`)
      const articlesMeta = articles.map(article => ({
        ...this._findArticleMeta(path.resolve(process.cwd(), article)),
        id: article,
        name: `@blog/${article.substr(articlesDir.length + 1).replace(/(?:\/readme)?\.md$/i, '')}`,
        url: `${baseUrl}/blog/${article.substr(articlesDir.length + 1).replace(/(?:\/readme)?\.md$/i, '')}`,
      }))
      const code = prettier.format(
        'export default [' +
          articlesMeta
            .map(
              ({ id, name, url, ...article }) =>
                ` 
                {
                  name: '${name}',
                  path: '${url}',
                  component: () => import('${id.replace(
                    /^src/,
                    '@'
                  )}').then(m => m.default).then(component => ({ ...component, layout: 'article' })),
                  meta: ${JSON.stringify(article)}
                },
              `
            )
            .join('\n') +
          collections
            .map(
              collection =>
                ` 
                {
                  path: 'blog/${collection.substr(collectionsDir.length + 1).replace(/(?:\/readme)?\.md$/i, '')}',
                  component: () => import('${collection.replace(/^src/, '@')}'),
                },
              `
            )
            .join('\n') +
          ']',
        { parser: 'babel', ...getPrettierConfig() }
      )

      fs.writeFileSync(
        'public/rss.xml',
        generateRSS(
          {
            title: `znck's blog`,
            copyright: '© 2018 - current | Rahul Kadyan',
            description: 'I write about JavaScript, Vue, Design and anything.',
            feed_url: 'https://znck.dev/rss.xml',
            image_url: 'https://znck.dev/social-image.png',
            language: 'en',
            managingEditor: 'Rahul Kadyan',
            site_url: 'https://znck.dev',
          },
          articlesMeta
        )
      )

      if (fs.existsSync(to) && fs.readFileSync(to, 'utf8').trim() === code.trim()) {
        return
      }

      fs.writeFileSync(to, code)
      fs.writeFileSync(
        'src/blog/routes.txt',
        articles
          .map(article => `/blog/${article.substr(articlesDir.length + 1).replace(/(?:\/readme)?\.md$/i, '')}`)
          .join('\n')
      )
    }

    compiler.hooks.run.tap(NAME, generate)
    compiler.hooks.watchRun.tap(NAME, generate)
  }

  _findArticleMeta(filename) {
    try {
      const contents = fs.readFileSync(filename, 'utf8')
      const { attributes } = parse(contents)

      return {
        title: attributes.title,
        excerpt: attributes.excerpt || `<p>${attributes.description}</p>`,
        published: attributes.published,
        tags: attributes.tags || [],
      }
    } catch (error) {
      return error
    }
  }
}
