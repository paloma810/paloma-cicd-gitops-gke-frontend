import { createStore } from 'vuex';
import axios from 'axios';

const backend_server = process.env.VUE_APP_BACKEND_SERVER
const backend_port = process.env.VUE_APP_BACKEND_PORT
const protocol = process.env.NODE_ENV === 'PROD' ? 'https' : 'http'

const store = createStore({
  state() {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      // トークンをLocalStorageに保存
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      // ログアウト時にLocalStorageからトークンを削除
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login(_, credentials) {
      try {
        console.log(credentials);
        console.log(`${backend_server}`)
        console.log(`${backend_port}`)
        const response = await axios.post(`${protocol}://${backend_server}:${backend_port}/api/authenticate`, credentials, { 
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        });

        const message = response.data.message;
        if (message === "Login successful") {
          // ログイン成功直後、そのままcheckAuthenticationを呼び出してユーザー情報を取得するのも効率的です
          await this.dispatch('checkAuthentication');
        }
        return Promise.resolve(message);
      } catch (error) {
        console.error('Login error:', error);
        return Promise.reject(error.response?.data?.message || 'Login failed');
      }
    },
    async checkAuthentication({ commit }) {
      try {
        const response = await axios.get(`${protocol}://${backend_server}:${backend_port}/api/me`, {
          withCredentials: true // Cookieを送信するために必須
        });

        // /api/me が 200 OK でユーザー情報を返した場合
        commit('setAuthentication', true);
        commit('setUser', { 
          id: response.data.userId, 
          username: response.data.username 
        });
      } catch (error) {
        // 401エラー（未認証/期限切れ）の場合は認証情報をクリア
        commit('setAuthentication', false);
        commit('setUser', null);
      }
    },
    async logout({ commit }) {
      try {
        // バックエンド側でもCookieを削除（期限切れに）する
        await axios.post(`${protocol}://${backend_server}:${backend_port}/api/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // 通信の成否に関わらずフロントエンドの状態をクリア
        commit('logout');
      }
    },
  },
});

export default store;
