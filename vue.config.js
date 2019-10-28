const path = require('path')
const fs = require('fs')

const routes = ['/']

if (fs.existsSync('src/blog/routes.txt')) {
  routes.push(
    ...fs
      .readFileSync('src/blog/routes.txt', 'utf8')
      .split('\n')
      .map(url => url + '/')
  )
}

process.env.VUE_APP_BASE_URL = process.env.BASE_URL || 'https://znck.dev'

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  lintOnSave: false,

  integrity: true,

  chainWebpack(config) {
    config.resolve.alias.set('@design', path.resolve(__dirname, 'src/design/_index.scss'))
    config.resolve.extensions.add('.scss')
    if (config.plugins.has('html')) {
      config.plugin('html').tap(([options = {}]) => {
        if (options && options.minify) options.minify.removeAttributeQuotes = false

        return [options]
      })
    }
  },

  pwa: {
    name: 'znck',
    themeColor: '#000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      msTileImage: 'favicon.png',
    },
  },
}
