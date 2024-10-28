import { createStore } from 'vuex';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const backend_server = process.env.VUE_APP_BACKEND_SERVER
const backend_port = process.env.VUE_APP_BACKEND_PORT

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
    async login({ commit }, credentials) {
      try {
        console.log(credentials);
        console.log(`${backend_server}`)
        console.log(`${backend_port}`)
        const response = await axios.post(`http://${backend_server}:${backend_port}/api/authenticate`, credentials, { headers: {
          'Content-Type': 'application/json'}});
        const message = response.data.message;
        console.log(message);

        if (message == "Login successful") {
          const token = response.data.token;
          commit('setToken', token);
        
          // トークンをデコードしてユーザ情報を取得
          const decodedToken = jwtDecode(token);
          commit('setUser', { id: decodedToken.userId, username: decodedToken.username });
        
          commit('setAuthentication', true);
          console.log("setAuthenticated true");
        }

        return Promise.resolve(message);
      } catch (error) {
        // エラーハンドリングをここに追加
        console.error('Login error:', error);
        return Promise.reject(error.response.data.message);
      }
    },
    checkAuthentication({ commit }) {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwtDecode(token);

        // トークンが有効であるか確認
        if (decodedToken.exp * 1000 > Date.now()) {
          commit('setAuthentication', true);
          commit('setUser', {
            id: decodedToken.userId,
            username: decodedToken.username,
          });
        } else {
          // トークンが有効期限切れの場合
          commit('setAuthentication', false);
          commit('setUser', null);
          localStorage.removeItem('token'); // ローカルストレージからトークンを削除
        }
      } else {
        commit('setAuthentication', false);
        commit('setUser', null);
      }
    },
    async logout({ commit }) {
      commit('logout');
    },
  },
});

export default store;
