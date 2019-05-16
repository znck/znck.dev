module.exports = function(source, map) {
  this.callback(
    null,
    `export default function (Component) {
      Component.options.frontmatter = ${source.trim().replace(/^export default/, '')}
    }`,
    map
  )
}
