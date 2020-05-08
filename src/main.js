import WebFontLoader from 'webfontloader'
import Vue from 'vue'
import VueHead from './plugins/vue-head'

import OutboundLink from './components/outbound-link.vue'
import Tweet from './components/tweet.vue'
import CaptionedImg from './components/captioned-img.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import './components/fenced-code'

import tokens from '@design'

WebFontLoader.load({
  classes: false,
  events: false,
  google: {
    families: [
      Object.entries(tokens)
        .filter(([key]) => key.startsWith('fontFace'))
        .map(([, value]) => JSON.parse(value).replace(/\s/g, '+'))
        .join('|') + '&display=swap',
    ],
  },
})

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.component('OutboundLink', OutboundLink)
Vue.component('CaptionedImg', CaptionedImg)
Vue.component('Tweet', Tweet)
Vue.use(VueHead)
const frontmatter = Vue.observable({ value: {} })
Vue.mixin({
  created() {
    if (this.$options.frontmatter) {
      frontmatter.value = this.$options.frontmatter
    }
  },
  activated() {
    if (this.$options.frontmatter) {
      frontmatter.value = this.$options.frontmatter
    }
  },
  computed: {
    $currentPageMeta() {
      return frontmatter.value
    },
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
