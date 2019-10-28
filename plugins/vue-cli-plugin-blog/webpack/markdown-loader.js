const utils = require('loader-utils')
const path = require('path')
const mdToVue = require('../md-to-vue')

module.exports = function markdown(source) {
  const options = utils.getOptions(this) || {}
  const output = mdToVue(source, {
    ...options,
    root: path.dirname(this.resourcePath.split('!').pop()),
  })

  return output
}
