const utils = require('loader-utils')
const mdToVue = require('../md-to-vue')

module.exports = function markdown(source) {
  const options = utils.getOptions(this) || {}
  const output = mdToVue(source, options)

  return output
}
