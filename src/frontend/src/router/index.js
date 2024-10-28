import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Page1 from '../components/Page1.vue'
import Store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/Page1',
    name: 'page1',
    component: Page1,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  Store.dispatch('checkAuthentication'); // ページ遷移前に認証情報を確認

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.state.isAuthenticated) {
      next({
        path: '/Login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
  } else {
    next(); 
  }
});

export default router
