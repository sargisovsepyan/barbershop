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


const routes = [
   { path: '/', component: Index },
   { path: '/AboutUs', component: AboutUs },
   { path: '/OurStaff', component: OurStaff },
   { path: '/Gallery', component: Gallery },
   {path: '/Authorization', component: Authorization},
   {path: '/AdminPanel', component: AdminPanel}
]

const router = new VueRouter({
   routes
})

Vue.use(VueRouter)
new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store
})
