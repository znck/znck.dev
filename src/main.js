import WebFontLoader from 'webfontloader'
import Vue from 'vue'
import VueHead from 'vue-head'
import ga from 'vue-ga'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import tokens from '@design'

if (process.env.NODE_ENV === 'production') {
  ga(router, 'UA-38503997-1')
}

WebFontLoader.load({
  google: {
    families: Object.entries(tokens)
      .filter(([key]) => key.startsWith('fontFace'))
      .map(([, value]) => JSON.parse(value)),
  },
})

Vue.config.productionTip = false
Vue.use(VueHead)
const frontmatter = Vue.observable({ value: {} })
Vue.mixin({
  created() {
    if (this.$options.frontmatter) {
      frontmatter.value = this.$options.frontmatter
    }
  },
  destroyed() {
    if (this.$options.frontmatter) {
      frontmatter.value = {}
    }
  },
  activated() {
    if (this.$options.frontmatter) {
      frontmatter.value = this.$options.frontmatter
    }
  },
  deactivated() {
    if (this.$options.frontmatter) {
      frontmatter.value = {}
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
