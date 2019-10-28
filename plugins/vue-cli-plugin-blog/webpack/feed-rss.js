const RSS = require('rss')

/**
 * @param {{ title: string, description: string, feed_url: string, site_url: string, image_url: string, copyright: string, language: string, managingEditor: string }} options
 * @param {{ title: string, excerpt: string, published: Date, url: string }[]} items
 */
module.exports = function generateRSSFeed(options, items) {
  const feed = new RSS({
    ttl: 60,
    language: 'en',
    pubDate: new Date().toISOString(),
    ...options,
  })

  items.forEach(item => {
    feed.item({
      title: item.title,
      description: item.excerpt,
      url: item.url,
      date: new Date(item.published).toUTCString(),
      categories: item.tags,
    })
  })

  return feed.xml()
}
