module.exports = api => {
  api.chainWebpack(
    /** @param {import('webpack-chain')} config */
    config => {
      // Add frontmatter block processor.
      config.module
        .rule('frontmatter')
        .resourceQuery(/blockType=frontmatter/)
        .use('frontmatter-loader')
        .loader(require.resolve('./webpack/frontmatter-loader'))

      const baseRule = config.module.rules.get('vue')
      const newRule = config.module.rule('markdown').merge(baseRule.entries())

      baseRule.uses.values().forEach(use => {
        newRule.use(use.name).merge(use.entries())
      })

      newRule.test(/\.md$/)

      newRule.use('markdown-loader').loader(require.resolve('./webpack/markdown-loader'))
      config.plugin('blog').use(require('./webpack/blog-plugin'), [
        {
          articlesDir: 'src/blog/articles',
          collectionsDir: 'src/blog/collections',
        },
      ])
    }
  )
}
