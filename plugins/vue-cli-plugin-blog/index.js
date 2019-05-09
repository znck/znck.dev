module.exports = api => {
  api.chainWebpack(
    /** @param {import('webpack-chain')} config */
    config => {
      config.plugin('blog').use(require('./webpack/blog-plugin'), [
        {
          articlesDir: 'blog/articles',
          collectionsDir: 'blog/collections',
          permalinkPattern: ':year-:slug',
        },
      ])
    }
  )
}
