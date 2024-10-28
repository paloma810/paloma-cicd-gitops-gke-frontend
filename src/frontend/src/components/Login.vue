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
