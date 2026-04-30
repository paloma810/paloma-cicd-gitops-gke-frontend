import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'

const store = createStore({
  state: { isAuthenticated: false },
  actions: {
    login: jest.fn().mockResolvedValue(''),
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div/>' } }],
})

describe('Login.vue', () => {
  it('ログインフォームが表示される', () => {
    const wrapper = mount(Login, {
      global: { plugins: [store, router] },
    })
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('くまさんのイラストがログイン画面下部に表示される', () => {
    const wrapper = mount(Login, {
      global: { plugins: [store, router] },
    })
    const bear = wrapper.find('[data-testid="bear-illustration"]')
    expect(bear.exists()).toBe(true)
  })

  it('くまさんのイラストはSVG要素である', () => {
    const wrapper = mount(Login, {
      global: { plugins: [store, router] },
    })
    const svg = wrapper.find('[data-testid="bear-illustration"] svg')
    expect(svg.exists()).toBe(true)
  })
})
