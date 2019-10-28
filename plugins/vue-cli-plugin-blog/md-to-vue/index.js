const createMD = require('../markdown')
const front = require('front-matter')
const cache = {}

module.exports =
  /**
   * @param {string} rawSource
   * @param {{ options?: import('../markdown').Options & import('markdown-it').Options, extend?(md: import('markdown-it')): void }} [config]
   */
  function MarkdownToVue(rawSource, config) {
    if (rawSource in cache) return cache[rawSource]

    const { hoists, source } = hoist(rawSource)
    const { code, attributes } = parse(source, config)

    const component = `<template>
<main id="main-content">${code.replace(/v-pre=""/g, 'v-pre')}</main>
</template>

${hoists.join('\n\n')}

<frontmatter>
${stringify(
  attributes,
  (key, value) => {
    if (value instanceof File) {
      return value.toString()
    }

    return value
  },
  2
)}
</frontmatter>
`
    cache[rawSource] = component

    return component
  }

const parse = function(source, options) {
  const md = createMD({
    ...options,
    hoist: {
      tags: options && options.hoist && options.hoist.tags ? ['frontmatter', ...options.hoist.tags] : ['frontmatter'],
    },
  })

  if (options.extend) options.extend(md)

  const env = {}
  const { body, attributes } = front(source)
  const matches = /^# (.*)?\n\n/.exec(body.trim())
  if (matches) attributes.title = matches[1]

  const code = md.render(matches ? body.trim().replace(/^# (.*)?\n\n/, '') : body, env)

  const parts = code.split('<!-- more -->')
  if (parts.length > 1) attributes.excerpt = parts[0]

  addFileImportsToFrontMatter(attributes)

  return {
    env,
    attributes,
    code,
  }
}

module.exports.parse = parse

/**
 *
 * @param {Record<string, any>} attributes
 */
function addFileImportsToFrontMatter(attributes) {
  if (typeof attributes.image === 'string' && isLocalFile(attributes.image)) {
    attributes.image = new File(attributes.image)
  }

  if (typeof attributes.cover === 'string' && isLocalFile(attributes.cover)) {
    attributes.cover = new File(attributes.cover)
  } else if (
    typeof attributes.cover === 'object' &&
    typeof attributes.cover.src === 'string' &&
    isLocalFile(attributes.cover.src)
  ) {
    attributes.cover.src = new File(attributes.cover.src)
  }
}

/**
 * @param {string} filePath
 */
function isLocalFile(filePath) {
  return !/^https?:\/\//.test(filePath)
}

class File {
  constructor(filePath) {
    this.path = filePath
  }

  toString() {
    return `require('${this.path}')`
  }
}

function stringify(target, replacer, space) {
  const code = JSON.stringify(target, replacer, space)

  return code.replace(/"(require\('.*?'\))"/gi, (_, code) => code)
}

function hoist(source, tagRE = /^(style|script)/) {
  let index = 0

  const hoists = []
  let isCodeBlock = false

  while (index < source.length) {
    if (source[index] === '`' && source.substr(index).startsWith('```')) {
      index += 2
      isCodeBlock = !isCodeBlock
    } else if (!isCodeBlock && source[index] === '<') {
      const match = tagRE.exec(source.substr(index + 1))

      if (match) {
        const start = index
        const endTag = `</${match[0]}>`
        let i = index + 1

        while (i < source.length) {
          if (source[i] === '<' && source[i + 1] === '/' && source.substr(i).startsWith(endTag)) break
          ++i
        }

        if (i >= source.length) {
          throw new Error('Expect ' + endTag + '. Not found')
        }

        hoists.push(source.substr(start, i - start + endTag.length))

        source = source.substr(0, index) + source.substr(i + endTag.length)
      }
    }

    ++index
  }

  return {
    source,
    hoists,
  }
}
