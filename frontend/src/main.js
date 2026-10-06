import Vue from 'vue'
import VueRouter from 'vue-router'



import App from './components/App.vue'
import Index from './components/Index.vue'
import AboutUs from './components/AboutUs.vue'
import OurStaff from './components/OurStaff.vue'
import Gallery from './components/Gallery.vue'
import Authorization from './components/Authorization.vue'
import AdminPanel from './components/AdminPanel.vue'
import store from './store.js'

Vue.use(VueRouter)

const routes = [
   { path: '/', component: Index },
   { path: '/AboutUs', component: AboutUs },
   { path: '/OurStaff', component: OurStaff },
   { path: '/Gallery', component: Gallery },
   { path: '/Authorization', component: Authorization},
   { path: '/AdminPanel', component: AdminPanel, meta: {requiresAuth: true} }
]

const router = new VueRouter({
   routes,
   scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
         return savedPosition
      }
      return { x: 0, y: 0 }
   }
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.requiresAuth)) {
      const user = store.getters.getUser
      if (!user || !user.token) {
         next({
            path: '/Authorization',
            query: { redirect: to.fullPath }
         })
      }
      else {
         next()
      }
   } else {
      next() 
   }
})

if ('scrollRestoration' in window.history) {
   window.history.scrollRestoration = 'manual'
}

new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store
})
