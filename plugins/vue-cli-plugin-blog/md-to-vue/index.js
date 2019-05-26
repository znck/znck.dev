const createMD = require('../markdown')
const front = require('front-matter')
const cache = {}

/**
 * @type {import('markdown-it')}
 */
let md

module.exports =
  /**
   *
   * @param {string} source
   * @param {{ options?: import('../markdown').Options & import('markdown-it').Options, extend?(md: import('markdown-it')): void }} [config]
   */
  function(source, config) {
    if (source in cache) return cache[source]

    const { env, code, attributes } = parse(source, config)

    const component = `<template>
<div style="display: contents">
  ${code.replace(/v-pre=""/g, 'v-pre')}
</div>
</template>

${env.hoistedTags ? env.hoistedTags.join('\n\n') : ''}

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
    cache[source] = component

    return component
  }

const parse = (module.exports.parse = function(source, { options, extend } = {}) {
  if (!md) {
    md = createMD({
      ...options,
      hoist: {
        tags: options && options.hoist && options.hoist.tags ? ['frontmatter', ...options.hoist.tags] : ['frontmatter'],
      },
    })

    if (extend) extend(md)
  }

  const env = {}
  const { body, attributes } = front(source)
  const matches = /^# (.*)?\n\n/.exec(body.trim())
  if (matches) attributes.title = matches[1]

  const code = md.render(matches ? body.trim().replace(/^# (.*)?\n\n/, '') : body, env)

  const parts = code.split('<!-- more -->')
  if (parts.length > 1) attributes.excerpt = parts[0]

  addFileImports(attributes)

  return {
    env,
    attributes,
    code,
  }
})

/**
 *
 * @param {Record<string, any>} attributes
 */
function addFileImports(attributes) {
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
