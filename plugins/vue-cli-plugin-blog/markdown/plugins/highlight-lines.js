// Modified from https://github.com/egoist/markdown-it-highlight-lines

const RE = /\[([\d,-]+)\]/
const wrapperRE = /^<pre .*?><code>/

const escapeHtml = html =>
  String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/:/g, '&#x3A;')
    .replace(/{/g, '&#x7B;')
    .replace(/}/g, '&#x7D;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

module.exports = md => {
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]

    if (!token.lineNumbers) {
      let rawInfo = token.info

      if (!rawInfo || !RE.test(rawInfo)) {
        token.lineNumbers = []
      } else {
        const langName = rawInfo.replace(RE, '').trim()
        // ensure the next plugin get the correct lang.
        token.info = langName

        const parsed = RE.exec(rawInfo)

        token.lineNumbers = (parsed ? parsed[1] : '')
          .split(',')
          .filter(Boolean)
          .map(v => v.split('-').map(v => parseInt(v, 10)))
      }
    }

    const source = token.content
    const code = options.highlight(token.content, token.info)
    const rawCode = code.replace(wrapperRE, '')
    const LOC = rawCode.split('\n').length
    const lang = JSON.stringify(token.info || 'text')
    const highlights = JSON.stringify(token.lineNumbers || [])

    return `
<fenced-code :loc="${LOC}" highlights="${highlights}" lang=${lang} code=${JSON.stringify(escapeHtml(code))}>
<pre class="language-${token.info}" v-pre><code>${escapeHtml(source)}</code></pre>
</fenced-code>`
  }
}
