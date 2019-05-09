/**
 * @typedef BlogPluginOptions
 *
 * @property {string} articlesDir - Path to load articles from.
 * @property {string} collectionsDir - Path to load collections from.
 * @property {string} permalinkPattern - Pattern to generate routes.
 */

const NAME = 'BlogPlugin'
const globby = require('globby')

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
    const generate = () => {
      console.log('Find articles...')
      const { articlesDir, collectionsDir } = this.options
      const articles = globby.sync(`${articlesDir}/**/*.md`)
      const collections = globby.sync(`${collectionsDir}/**/*.md`)

      console.log(articles, collections)
    }

    compiler.hooks.run.tap(NAME, generate)
    compiler.hooks.watchRun.tap(NAME, generate)
  }
}
