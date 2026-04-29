<template>
  <v-app>
    <v-card
      width="500px"
      class="mx-auto mt-5"
    >
      <v-toolbar
        color="primary"
        flat
      >
        Paloma-inds.com
      </v-toolbar>
      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="username"
            prepend-icon="mdi-account-circle"
            label="user ID"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'" 
            prepend-icon="mdi-lock" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="password"
            @click:append="showPassword = !showPassword"
          />
          <v-card-actions>
            <v-btn
              block
              class="info"
              @click="login"
            >
              LogIn
            </v-btn>
          </v-card-actions>

          <div class="mt-12 text-center">
            {{ msg }}
          </div>

          <div data-testid="bear-illustration" class="mt-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 120"
              width="120"
              height="120"
              aria-label="くまさんのイラスト"
              role="img"
            >
              <!-- 耳 -->
              <circle cx="38" cy="30" r="14" fill="#8B6914" />
              <circle cx="82" cy="30" r="14" fill="#8B6914" />
              <!-- 耳の内側 -->
              <circle cx="38" cy="30" r="9" fill="#E8A87C" />
              <circle cx="82" cy="30" r="9" fill="#E8A87C" />
              <!-- 頭 -->
              <circle cx="60" cy="55" r="30" fill="#A0792A" />
              <!-- 体 -->
              <ellipse cx="60" cy="96" rx="24" ry="18" fill="#A0792A" />
              <!-- 顔の白い部分 -->
              <ellipse cx="60" cy="62" rx="16" ry="13" fill="#D4A574" />
              <!-- 目 -->
              <circle cx="51" cy="50" r="4" fill="#2C1810" />
              <circle cx="69" cy="50" r="4" fill="#2C1810" />
              <!-- 目のハイライト -->
              <circle cx="52.5" cy="48.5" r="1.5" fill="white" />
              <circle cx="70.5" cy="48.5" r="1.5" fill="white" />
              <!-- 鼻 -->
              <ellipse cx="60" cy="59" rx="5" ry="4" fill="#2C1810" />
              <!-- 口 -->
              <path d="M54 65 Q60 71 66 65" stroke="#2C1810" stroke-width="2" fill="none" stroke-linecap="round" />
              <!-- ほっぺ -->
              <circle cx="43" cy="60" r="6" fill="#FF9E9E" opacity="0.65" />
              <circle cx="77" cy="60" r="6" fill="#FF9E9E" opacity="0.65" />
            </svg>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
//import bcrypt from 'bcryptjs';

export default {
  name: 'Login',
  data () {
    return {
      showPassword : false,
      msg : 'userIDとpasswordを入力して下さい',
      username : '',
      password : ''
    }
  },
  methods: {
    async login() {
      //const hashedPassword = bcrypt.hashSync(this.password, 10);
      const data = { username : this.username, password : this.password };


      this.msg = this.$store.dispatch("login", data)
      .then(message => {
        this.msg = message;
        if (this.$store.state.isAuthenticated) {
          this.msg = "move the top page ..."
          this.$router.push('/Page1');
        } else {
          this.msg = "no authenticated"
        }
      })
      .catch(error => {
        this.msg = error;
        return error;
      });

    }
  }
};
</script>
