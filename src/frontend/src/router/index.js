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

router.beforeEach(async (to, _from, next) => {
  await Store.dispatch('checkAuthentication'); // ページ遷移前に認証情報を確認（await で完了を待つ）

  const isAuthenticated = Store.state.isAuthenticated;
  const isGuestOnly = to.name === 'home' || to.name === 'login';

  if (isGuestOnly && isAuthenticated) {
    // ログイン済みで Login/home にアクセスした場合はトップページへ
    next({ path: '/Page1' });
  } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // 認証が必要なページに未認証でアクセスした場合は Login へ
    next({ path: '/Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router
