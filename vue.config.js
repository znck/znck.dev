const path = require('path')
const fs = require('fs')

const routes = []

if (fs.existsSync('src/blog/routes.txt')) {
  routes.push(...fs.readFileSync('src/blog/routes.txt', 'utf8').split('\n'))
}

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  lintOnSave: false,

  chainWebpack(config) {
    config.resolve.alias.set('@design', path.resolve(__dirname, 'src/design/_index.scss'))
    config.resolve.extensions.add('.scss')
  },

  pwa: {
    name: 'znck',
    themeColor: '#eb5757',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'icon-96.png',
      favicon16: 'icon-48.png',
      appleTouchIcon: 'icon-152.png',
      msTileImage: 'icon-144.png',
    },
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: routes,
      useRenderEvent: false,
      headless: true,
      onlyProduction: true,
    },
  },
}
