<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>My Vuetify App</v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>TOPページ</v-card-title>
              <v-card-text>
                ここにTOPページのコンテンツが表示されます。
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <v-container>
        <v-row>
          <v-col>
            <v-footer-item text>
              &copy; 2023 My Vuetify App
            </v-footer-item>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="navigateTo(item.route)"
        >
          <v-list-item-icon>{{ item.icon }}</v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'About', icon: 'mdi-information', route: '/about' },
        // Add more menu items as needed
      ]
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    navigateTo(route) {
      this.$router.push(route);
      this.drawer = false;
    },
    async logout() {
      try {
        // 1. Vuexのlogoutアクションを呼び出す（バックエンドのAPI通信を含む）
        await this.$store.dispatch('logout');
        
        // 2. ログアウト成功後、ログイン画面へ遷移
        this.$router.push('/login');
        
        // （任意）通知を表示する場合など
        console.log("ログアウトしました");
      } catch (error) {
        console.error("ログアウト処理中にエラーが発生しました", error);
        // エラーが発生しても強制的にログイン画面に戻す
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style>
/* Add your custom styles here */
</style>

