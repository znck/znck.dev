/**
 * @typedef Options
 * @property {string[]} tags
 */

module.exports =
  /**
   * @param {import('markdown-it')} md
   * @param {Options} options
   */
  function hoistTags(md, options = { tags: [] }) {
    const tags = ['script', 'style', ...options.tags]
    const RE = new RegExp(`/^<(${tags.join('|')})(?=(\\s|>|$))/`, 'i')

    md.renderer.rules.html_block = (tokens, idx, options, env) => {
      const content = tokens[idx].content
      const hoistedTags = env.hoistedTags || (env.hoistedTags = [])
      if (RE.test(content.trim())) {
        hoistedTags.push(content)
        return ''
      }

      return content
    }
  }
