import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

import blogRoutes from './blog/routes'
import IndexPage from '@/pages/index.vue'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: [
        ...routes,
        ...blogRoutes,
        {
          path: '*',
          component: {
            ...IndexPage,
            layout: 'default',
          },
        },
      ],
    },
  ],
})
